const MongoClient = require("mongodb").MongoClient;
const { password } = require("../passwords");

const config = {
  dbURL: `mongodb+srv://shani:${password}@cluster0.ogtw2.mongodb.net/?retryWrites=true&w=majority`,
};

module.exports = {
  getCollection,
};

const dbName = "color_db";

var dbConn = null;

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    console.log("Failed to get Mongo collection", err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}
