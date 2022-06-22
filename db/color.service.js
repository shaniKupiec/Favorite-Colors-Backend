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

async function add(color) {
  try {
    const data = {
      color,
      votes: 0,
    };
    const collection = await dbService.getCollection("color");
    const { insertedId } = await collection.insertOne(data);
    data._id = insertedId;
    return data;
  } catch (err) {
    console.log("cannot insert color", err);
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

async function remove(colorId) {
  try {
    const collection = await dbService.getCollection("color");
    await collection.deleteOne({ _id: ObjectId(colorId) });
    return colorId;
  } catch (err) {
    console.log(`cannot remove color ${colorId}`, err);
    throw err;
  }
}

module.exports = {
  query,
  getById,
  add,
  update,
  remove,
};
