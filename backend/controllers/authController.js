const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   GENERATE TOKEN (UPDATED)
========================= */
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId },
        process.env.JWT_SECRET, { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });

    return token; // ✅ REQUIRED
};

/* =========================
   REGISTER
========================= */
exports.registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(res, user._id); // ✅ UPDATED

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token, // ✅ RETURN TOKEN
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: "Registration failed" });
    }
};

/* =========================
   LOGIN
========================= */
exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(res, user._id); // ✅ UPDATED

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token, // ✅ RETURN TOKEN
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Login failed" });
    }
};

/* =========================
   LOGOUT
========================= */
exports.logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0),
        path: "/",
    });

    res.json({ message: "Logged out successfully" });
};

/* =========================
   GET CURRENT USER
========================= */
exports.getMe = async(req, res) => {
    res.json(req.user);
};