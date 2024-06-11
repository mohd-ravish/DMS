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

// Route to update document types
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

// Route to add new document type
router.post('/addNewDocType', verifyUser, (req, res) => {
    const { newDocTypeName } = req.body;
    const current_date = new Date();
    const query = "INSERT INTO document_type (doctype_nm) VALUES (?)";
    db.query(query, [newDocTypeName], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database insertion error" });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} added a new doc type[${newDocTypeName}]`, current_date], (err, result) => {
            if (err) throw err;
        });
        res.json({ status: "success", message: "New Doc Type Added Successfully" });
    });
});

// Route get user artifacts
router.get('/myArtifacts', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_documents WHERE owner_author_id = ? ORDER BY id DESC";
    db.query(query, [req.email], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to get all artifacts
router.get('/allArtifacts', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_documents ORDER BY id DESC";
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
    const current_date = new Date();
    const query = "DELETE FROM documents WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted an artifact[with ID: ${id}]`, current_date], (err, result) => {
            if (err) throw err;
        });
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to get top 10 contributors
router.get('/topContributors', (req, res) => {
    const query = `
        SELECT owner_author_id, COUNT(*) AS doc_count
        FROM vw_documents
        GROUP BY owner_author_id
        ORDER BY doc_count DESC
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

// Route to get total count of docs and URLs
router.get('/countArtifacts', (req, res) => {
    const query = `
        SELECT 
            SUM(CASE WHEN doc_format != 'url' THEN 1 ELSE 0 END) AS total_docs,
            SUM(CASE WHEN doc_format = 'url' THEN 1 ELSE 0 END) AS total_urls
        FROM vw_documents
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.json({ status: 'success', data: results[0] });
    });
});

module.exports = router;


module.exports = router;