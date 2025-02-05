const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://mongo:27017/";


let db, collection;

const connectDB = async() => {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("localSoftwaredb");
    collection = db.collection("localSoftwareCollection");
};

const UserModel = {
    getAllUsers: async() => {
        return await collection.find().toArray();
    },
    addUser: async(user) => {
        return await collection.insertOne(user);
    },
    updateUser: async(id, data) => {
        return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    },
    deleteUser: async(id) => {
        return await collection.deleteOne({ _id: new ObjectId(id) });
    },
};

connectDB();
module.exports = UserModel;