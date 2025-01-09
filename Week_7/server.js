const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");

const app = express();
const PORT = 3000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust this for production
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/companies", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "company.html"));
});

app.get("/health", (req, res) => {
    res.status(200).send("Server is running smoothly!");
});

// API Routes
app.use("/api", userRoutes);
app.use("/api", companyRoutes);

io.on("connection", (socket) => {
    console.log(`🔌 A user connected with ID: ${socket.id}`);

    socket.emit("testConnection", { message: "Socket.IO connection established!" });

    socket.on("disconnect", () => {
        console.log(`❌ User disconnected with ID: ${socket.id}`);
    });

    socket.on("companyAdded", (data) => {
        console.log("📤 'companyAdded' received with data:", data);
        io.emit("refreshCompanies");
    });

    socket.on("companyUpdated", (data) => {
        console.log("📤 'companyUpdated' received with data:", data);
        io.emit("refreshCompanies");
    });

    socket.on("companyDeleted", (data) => {
        console.log("📤 'companyDeleted' received with data:", data);
        io.emit("refreshCompanies");
    });
});

// Graceful shutdown (Optional)
process.on("SIGINT", () => {
    console.log("🛑 Shutting down server gracefully...");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});

// Start the server
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});