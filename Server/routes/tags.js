const express = require('express');
const verifyUser = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

// Route to get document tags 
router.get('/allTags', verifyUser, (req, res) => {
    const query = "SELECT * FROM tags WHERE status = 'active'";
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database query error" });
        }
        res.json({ status: "success", data: results });
    });
});

// Route to create new tags
router.post('/createTag', verifyUser, (req, res) => {
    const { tag_nm } = req.body;
    const created_by = req.email; // Assuming email is stored in req after verification
    const created_at = new Date();

    const query = "INSERT INTO tags (tag_nm, created_by, created_at, status) VALUES (?, ?, ?, 'active')";
    db.query(query, [tag_nm, created_by, created_at], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database insertion error" });
        }
        res.json({ status: "success", data: { id: result.insertId, tag_nm } });
    });
});

// Route to update Tags
router.put('/updateTags/:id', verifyUser, async (req, res) => {
    const { id } = req.params;
    const { tagName } = req.body;
    const current_date = new Date();
    try {
        const query = 'UPDATE tags SET tag_nm = ?, created_by = ?, created_at = ? WHERE id = ?'
        db.query(query, [tagName, req.email, current_date, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ status: "error", message: "Database update error" });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} updated a tag with ID: ${id} to ${tagName}`, current_date], (err, result) => {
                if (err) throw err;
            });
            res.json({ status: "success", message: "Tag updated successfully" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to update tag' });
    }
});

module.exports = router;