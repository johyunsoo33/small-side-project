const { MongoClient, ObjectId } = require("mongodb");
let mongoDB = null;

// [연결] 서버가 뜰 때 한 번 연결하고 이후 모든 함수가 이 mongoDB 를 공유한다.
(async () => {
  const urlMongoDB = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/?maxPoolSize=${process.env.MONGODB_LIMIT}`;
  const client = new MongoClient(urlMongoDB);
  try {
    await client.connect();
    console.log("MongoDB 연결 성공");
    mongoDB = client.db(process.env.MONGODB_DB);
  } catch (err) {
    console.log(err);
  }
})();

// [조회] 컬렉션 전체 또는 조건에 맞는 문서 목록
const find = async (collectionName, condition = {}) => {
  const r = await mongoDB.collection(collectionName).find(condition).toArray();
  return r;
};

// [조회] _id 로 문서 하나
const findByID = async (collectionName, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .findOne({ _id: new ObjectId(_id) });
  return r;
};

// [생성] 문서 하나 추가
const insert = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertOne(data);
  return r;
};

// [생성] 문서 여러 개 한 번에 추가
const insertMany = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertMany(data);
  return r;
};

// [수정] _id 로 찾아 넘어온 필드만 덮어쓴다
const update = async (collectionName, data, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: data, $currentDate: { lastModified: true } },
    );
  return r;
};

// [삭제] _id 로 문서 하나 삭제
const deleteByID = async (collectionName, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(_id) });
  return r;
};

module.exports = {
  find,
  findByID,
  insert,
  insertMany,
  update,
  deleteByID,
};
