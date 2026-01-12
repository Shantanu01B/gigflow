const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// 🔗 Connect DB
connectDB();

// ✅ CORS MUST BE FIRST
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://gigflow-w9hn-l9r5ov8ai-shantanus-projects-17a0aacd.vercel.app",
        ],
        credentials: true,
    })
);

// ✅ THEN parsers
app.use(express.json());
app.use(cookieParser());

// 📦 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/gigs", require("./routes/gigRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));

// 🌐 HTTP server
const server = http.createServer(app);

// 🔌 Socket.io
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://gigflow-w9hn-l9r5ov8ai-shantanus-projects-17a0aacd.vercel.app",
        ],
        credentials: true,
    },
});

// 🔔 Socket events
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinGig", (gigId) => {
        socket.join(gigId);
        console.log(`Joined gig room: ${gigId}`);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

// 🔑 Make io available to controllers
app.set("io", io);

// 🚀 Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});