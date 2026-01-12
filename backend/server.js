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

// ======================
// ✅ CORS (FIXED & SAFE)
// ======================
app.use(
    cors({
        origin: "https://gigflow-wine.vercel.app", // ✅ ONLY frontend
        credentials: true,
    })
);

// ======================
// ✅ MIDDLEWARES
// ======================
app.use(express.json());
app.use(cookieParser());

// ======================
// ✅ ROUTES
// ======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/gigs", require("./routes/gigRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));

// ======================
// ✅ HTTP SERVER
// ======================
const server = http.createServer(app);

// ======================
// ✅ SOCKET.IO (MATCH CORS)
// ======================
const io = new Server(server, {
    cors: {
        origin: "https://gigflow-wine.vercel.app",
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinGig", (gigId) => {
        socket.join(gigId);
        console.log("Joined gig:", gigId);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

// 🔑 Make io accessible
app.set("io", io);

// ======================
// 🚀 START SERVER
// ======================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});