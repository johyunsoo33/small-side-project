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
  insert,
  insertMany,
  update,
  deleteByID,
};
