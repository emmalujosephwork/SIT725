const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Serve the user management page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Serve the company management page
app.get("/companies", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "company.html"));
});

// API Routes
app.use("/api", userRoutes);
app.use("/api", companyRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));