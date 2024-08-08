const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.findUserByEmail(email);
        if (!user) {
            return res.json("User not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json("Incorrect password");
        }
        jwt.sign({ id: user.id, username: user.username, email: user.email, role_id: user.role_id }, JWT_SECRET_KEY, { expiresIn: '24h' }, async (err, token) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Token generation failed" });
            }
            await authService.logActivity(user.id, `User: ${email} successfully logged in`);
            return res.status(200).json({ token });
        });
    } catch (error) {
        console.error(error);
        return res.json("Internal Server Error");
    }
};

exports.verifyUser = (req, res) => {
    res.json({ status: "success", username: req.username, role_id: req.role_id });
};

exports.logout = async (req, res) => {
    try {
        await authService.logActivity(req.id, `User: ${req.email} successfully logged out`);
        res.json({ status: "success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};