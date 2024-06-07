const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require('../config/db');
const verifyUser = require('../middleware/auth');

const router = express.Router();

// Secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Route to Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user with the provided email exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.json("Internal Server Error");
            }
            if (results.length === 0) {
                console.log("User not found");
                return res.json("User not found");
            } else {
                const user = results[0];
                // Compare the provided password with the stored hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    // Generate JWT token
                    jwt.sign({ id: user.id, username: user.username, email: user.email, role_id: user.role_id }, JWT_SECRET_KEY, { expiresIn: '4h' }, (err, token) => {
                        if (err) {
                            console.error(err);
                            return res.json({ error: "Token generation failed" });
                        }
                        // Insert login activity log
                        const log_date = new Date();
                        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [user.id, `User: ${user.email} successfully logged in`, log_date], (err, result) => {
                            if (err) throw err;
                        });
                        console.log(`User: ${user.email} successfully logged in`);
                        return res.status(200).json({ token });
                    });
                } else {
                    console.log("Incorrect password");
                    return res.json("Incorrect password");
                }
            }
        });
    } catch (err) {
        console.error(err);
        return res.json("Internal Server Error");
    }
});

// Route to verify user
router.get("/verifyUser", verifyUser, (req, res) => {
    return res.json({ status: "success", username: req.username, role_id: req.role_id });
});

// Route to logout
router.post("/logout", verifyUser, (req, res) => {
    const log_date = new Date();
    db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} successfully logged out`, log_date], (err, result) => {
        if (err) throw err;
        console.log(`User ${req.email} logged out`);
        return res.json({ status: "success" });
    });
});

module.exports = router;