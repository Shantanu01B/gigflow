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
// ✅ CORS (PRODUCTION SAFE)
// ======================
const allowedOrigins = [
    "https://gigflow-cyan.vercel.app",
    "https://gigflow-wine.vercel.app",
    "http://localhost:5173",
];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
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
        origin: allowedOrigins,
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

// 🔑 Make io accessible in routes
app.set("io", io);

// ======================
// 🚀 START SERVER
// ======================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});