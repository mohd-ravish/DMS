const express = require('express');
const verifyUser = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

// Get document types 
router.get('/documentTypes', verifyUser, (req, res) => {
    const query = "SELECT id, doctype_nm FROM document_type";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Get user artifacts
router.get('/myArtifacts', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_documents WHERE owner_author_id = ?";
    db.query(query, [req.email], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Get all artifacts
router.get('/allArtifacts', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_documents";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

module.exports = router;