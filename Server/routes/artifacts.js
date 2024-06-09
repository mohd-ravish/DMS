const express = require('express');
const verifyUser = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

// Route to get document types 
router.get('/documentTypes', verifyUser, (req, res) => {
    const query = "SELECT id, doctype_nm FROM vw_document_type";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to update Doc types
router.put('/updateDocTypes/:id', verifyUser, async (req, res) => {
    const { id } = req.params;
    const { docTypeName } = req.body;
    const current_date = new Date();
    try {
        const query = 'UPDATE document_type SET doctype_nm = ? WHERE id = ?'
        db.query(query, [docTypeName, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ status: "error", message: "Database update error" });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} updated a doc type with ID: ${id} to ${docTypeName}`, current_date], (err, result) => {
                if (err) throw err;
            });
            res.json({ status: "success", message: "Doc type updated successfully" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to update doc type' });
    }
});

// Route get user artifacts
router.get('/myArtifacts', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_documents WHERE owner_author_id = ?";
    db.query(query, [req.email], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to get all artifacts
router.get('/allArtifacts', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_documents";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to delete artifacts
router.delete('/deleteArtifact/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM documents WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

module.exports = router;