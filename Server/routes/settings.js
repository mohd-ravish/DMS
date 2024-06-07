const express = require('express');
const verifyUser = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

// Route to fetch current system settings
router.get('/systemSettings', verifyUser, (req, res) => {
    const query = 'SELECT * FROM system_settings WHERE variable_name = "file_upload_limit"';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Database query error" });
        }
        if (results.length > 0) {
            res.json({
                status: "success",
                data: {
                    limit: results[0].value,
                    updatedBy: results[0].updated_by,
                    lastUpdated: results[0].last_updated_on,
                },
            });
        } else {
            res.json({ status: "error", message: "No settings found" });
        }
    });
});

// Route to update system settings
router.post('/updateSystemSettings', verifyUser, (req, res) => {
    const { newLimit } = req.body;
    const current_date = new Date();
    const query = `
        UPDATE system_settings 
        SET value = ?, updated_by = ?, last_updated_on = ?
        WHERE variable_name = "file_upload_limit"
    `;
    db.query(query, [newLimit, req.email, current_date], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database update error" });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} updated system settings`, current_date], (err, result) => {
            if (err) throw err;
        });
        res.json({ status: "success", message: "System settings updated successfully" });
    });
});

module.exports = router;