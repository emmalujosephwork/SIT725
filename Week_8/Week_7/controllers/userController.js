const UserModel = require("../models/userModel");

const UserController = {
    // Fetch all users
    getUsers: async(req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            console.error("Error fetching users:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Add a new user
    addUser: async(req, res) => {
        const { name, email, phone } = req.body;
        try {
            await UserModel.addUser({ name, email, phone });
            res.status(201).send("User added successfully");
        } catch (err) {
            console.error("Error adding user:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Update a user
    updateUser: async(req, res) => {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        try {
            await UserModel.updateUser(id, { name, email, phone });
            res.status(200).send("User updated successfully");
        } catch (err) {
            console.error("Error updating user:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Delete a user
    deleteUser: async(req, res) => {
        const { id } = req.params;
        try {
            await UserModel.deleteUser(id);
            res.status(200).send("User deleted successfully");
        } catch (err) {
            console.error("Error deleting user:", err);
            res.status(500).send("Internal server error");
        }
    },
};

module.exports = UserController;