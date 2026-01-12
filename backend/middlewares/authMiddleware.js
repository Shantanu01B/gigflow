const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async(req, res, next) => {
    try {
        const token = req.cookies && req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("AUTH ERROR:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;