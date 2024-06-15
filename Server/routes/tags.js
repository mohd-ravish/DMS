const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route to get document tags 
router.get('/allTags', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_tags";
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

// Route to save searched tag
router.post('/saveSearchedTag', verifyUser, (req, res) => {
    const { tagName } = req.body;
    const searchedBy = req.email;
    const searchedOn = new Date();
    const query = "INSERT INTO searched_tags (tag_nm, searched_by, searched_on) VALUES (?, ?, ?)";
    try {
        db.query(query, [tagName, searchedBy, searchedOn], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} searched for documentation with tag [${tagName}]`, searchedOn], (err, result) => {
                if (err) throw err;
            });
            return res.status(200).json({ status: 'success' });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
    }
});

// Route to get top 10 searched tags
router.get('/topSearchedTags', (req, res) => {
    const query = `
        SELECT tag_nm, COUNT(*) AS search_count
        FROM vw_searched_tags
        GROUP BY tag_nm
        ORDER BY search_count DESC
        LIMIT 10
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.json({ status: 'success', data: results });
    });
});

// Route to get total searches and total searches in the current month
router.get('/countSearches', (req, res) => {
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based, so add 1
    const currentYear = new Date().getFullYear();
    const query = `
        SELECT 
            COUNT(*) AS total_searches,
            SUM(CASE WHEN MONTH(searched_on) = ? AND YEAR(searched_on) = ? THEN 1 ELSE 0 END) AS current_month_searches
        FROM vw_searched_tags
    `;
    db.query(query, [currentMonth, currentYear], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.json({ status: 'success', data: results[0] });
    });
});

module.exports = router;