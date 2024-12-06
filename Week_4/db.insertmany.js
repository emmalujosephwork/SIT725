const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

async function run() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db("localSoftwaredb");
        const collection = db.collection("localSoftwareCollection");
        var myobj = [
            { name: 'John', address: 'Highway 71' },
            { name: 'Peter', address: 'Lowstreet 4' },
            { name: 'Amy', address: 'Apple st 652' },
            { name: 'Hannah', address: 'Mountain 21' },
            { name: 'Michael', address: 'Valley 345' },
            { name: 'Sandy', address: 'Ocean blvd 2' },
            { name: 'Betty', address: 'Green Grass 1' },
            { name: 'Richard', address: 'Sky st 331' },
            { name: 'Susan', address: 'One way 98' },
            { name: 'Vicky', address: 'Yellow Garden 2' },
            { name: 'Ben', address: 'Park Lane 38' },
            { name: 'William', address: 'Central st 954' },
            { name: 'Chuck', address: 'Main Road 989' },
            { name: 'Viola', address: 'Sideway 1633' }
        ];
        const result = await collection.insertMany(myobj);
        console.log("14 document inserted:", result.insertedId);
    } catch (err) {
        console.error("An error occurred:", err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

run();