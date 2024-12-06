const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

async function run() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected successfully to server");

        // Select the database and collection
        const db = client.db("localSoftwaredb");
        const collection = db.collection("localSoftwareCollection");

        // Insert a document
        const myobj = { name: "Company Inc", address: "Highway 37" };
        const result = await collection.insertOne(myobj);

        console.log("1 document inserted:", result.insertedId);
    } catch (err) {
        console.error("An error occurred:", err);
    } finally {
        // Ensure the client is closed
        await client.close();
        console.log("Connection closed");
    }
}

run();