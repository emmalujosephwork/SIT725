const express = require("express");
const { MongoClient, ObjectId } = require("mongodb"); // Include ObjectId for ID validation
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

let db, collection;
client.connect()
    .then(() => {
        db = client.db("localSoftwaredb");
        collection = db.collection("localSoftwareCollection");
        console.log("Connected to MongoDB");
    })
    .catch(err => console.error("Failed to connect to MongoDB", err));

app.post("/add-user", async(req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).send("All fields are required");
        }

        const myobj = { name, email, phone };
        const result = await collection.insertOne(myobj);

        res.status(201).send(`User added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).send("Internal server error");
    }
});

app.get("/get-users", async(req, res) => {
    try {
        const users = await collection.find().toArray();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal server error");
    }
});

app.delete('/delete-user/:id', async(req, res) => {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
    }

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'User deleted successfully!' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
});

app.put("/update-user/:id", async(req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name, email, phone } });

        if (result.modifiedCount === 1) {
            res.status(200).send("User updated successfully!");
        } else {
            res.status(404).send("User not found or no changes made.");
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Error updating user.");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});