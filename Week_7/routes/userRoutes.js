const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// Fetch all users
router.get("/users", UserController.getUsers);

// Add a new user
router.post("/users", UserController.addUser);

// Update a user
router.put("/users/:id", UserController.updateUser);

// Delete a user
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;