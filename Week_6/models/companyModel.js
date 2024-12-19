const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017/";

let db, collection;

const connectDB = async() => {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("localSoftwaredb");
    collection = db.collection("mvcdb");
};

const CompanyModel = {
    getAllCompanies: async() => {
        return await collection.find().toArray();
    },
    addCompany: async(company) => {
        return await collection.insertOne(company);
    },
    updateCompany: async(id, data) => {
        return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    },
    deleteCompany: async(id) => {
        return await collection.deleteOne({ _id: new ObjectId(id) });
    },
};

connectDB();
module.exports = CompanyModel;