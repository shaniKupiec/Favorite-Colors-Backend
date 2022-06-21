const dbService = require("./db.service");
const ObjectId = require("mongodb").ObjectId;

async function query() {
  try {
    const collection = await dbService.getCollection("color");
    var colors = await collection.find({}).toArray();
    return colors;
  } catch (err) {
    throw err;
  }
}

async function getById(colorId) {
  try {
    const collection = await dbService.getCollection("color");
    const color = collection.findOne({ _id: ObjectId(colorId) });
    return color;
  } catch (err) {
    console.log(`cannot find color: ${colorId}`, err);
    throw err;
  }
}

async function update(color) {
  try {
    var id = ObjectId(color._id);
    delete color._id;
    const collection = await dbService.getCollection("color");
    await collection.updateOne({ _id: id }, { $set: { ...color } });
    color._id = id;
    return color;
  } catch (err) {
    console.log(`cannot update color ${color._id}`, err);
    throw err;
  }
}


module.exports = {
  query,
  getById,
  update,
};
