const { MongoClient, ObjectId } = require("mongodb");
let mongoDB = null;

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

const find = async (collectionName, condition = {}) => {
  const r = await mongoDB.collection(collectionName).find(condition).toArray();
  return r;
};

// _id 로 문서 하나를 조회한다. 저장 시 _id 가 ObjectId 라 문자열 조건으론 안 맞으므로 여기서 변환한다.
const findByID = async (collectionName, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .findOne({ _id: new ObjectId(_id) });
  return r;
};

// // 여러 컬렉션을 한 번에 조회한다.
// // _id 만으로는 어느 컬렉션에서 나온 문서인지 알 수 없으므로 출처를 함께 붙여서 반환한다.
// const findMany = async (collectionNames, condition = {}) => {
//   const results = await Promise.all(
//     collectionNames.map(async (name) => {
//       const docs = await find(name, condition);
//       return docs.map((doc) => ({ ...doc, collection: name }));
//     }),
//   );
//   return results.flat();
// };

// // 한 컬렉션에서 _id 목록으로 한 번에 조회한다.
// const findByIds = async (collectionName, ids) => {
//   const objectIds = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
//   if (objectIds.length === 0) return [];
//   return find(collectionName, { _id: { $in: objectIds } });
// };

const insert = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertOne(data);
  return r;
};

const insertMany = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertMany(data);
  return r;
};

const update = async (collectionName, data, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: data, $currentDate: { lastModified: true } },
    );
  return r;
};

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
