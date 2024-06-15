const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route get user info
router.get('/getUsers', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_users";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route Change user role
router.put('/changeRole', verifyUser, (req, res) => {
    const { userId, newRoleId } = req.body;
    const current_date = new Date();
    try {
        const query = "UPDATE users SET role_id = ? WHERE id = ?";
        db.query(query, [newRoleId, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} changed the role of user with ID: ${userId}`, current_date], (err, result) => {
                if (err) throw err;
            });
            return res.status(200).json({ status: 'success', message: 'User role updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to change role' });
    }
});

// Route delete a user
router.delete('/deleteUser/:id', verifyUser, (req, res) => {
    const userId = req.params.id;
    const current_date = new Date();
    try {
        const query = "DELETE FROM users WHERE id = ?";
        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted the account of user with ID: ${userId}`, current_date], (err, result) => {
                if (err) throw err;
            });
            return res.status(200).json({ status: 'success', message: 'User deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to delete user' });
    }
});

// Route to get user activity logs
router.post('/userActivity', verifyUser, (req, res) => {
    const { userId, period } = req.body;
    const current_date = new Date();
    const query = `
        SELECT * FROM vw_logs
        WHERE user_id = ? AND log_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY) ORDER BY log_id DESC
    `;
    db.query(query, [userId, parseInt(period)], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} searched for activities[by user: ${userId}] in last ${period} days`, current_date], (err, result) => {
            if (err) throw err;
        });
        return res.status(200).json({ status: 'success', data: results });
    });
});

module.exports = router;