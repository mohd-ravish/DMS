const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');
const fs = require('fs');

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
        const newDocTypeId = result.insertId;
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} added a new doc type[${newDocTypeName}]`, current_date], (err, result) => {
            if (err) throw err;
        });
        res.json({ status: "success", message: "New Doc Type added Successfully", data: newDocTypeId });
    });
});

// Route to delete doc type
router.delete('/deleteDoctype/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const current_date = new Date();
    const query = "DELETE FROM document_type WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted a doc Type[with ID: ${id}]`, current_date], (err, result) => {
            if (err) throw err;
        });
        return res.status(200).json({ status: 'success', message: 'Document Type deleted successfully' });
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

// Route to delete artifact
router.delete('/deleteArtifact/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const current_date = new Date();

    // Query to fetch artifact details
    const query = "SELECT doc_nm, doc_format, file_size FROM vw_documents WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        const docName = results[0].doc_nm;
        const docFormat = results[0].doc_format;
        const docSize = results[0].file_size;

        // Perform deletion based on artifact type (document or URL)
        if (docFormat !== 'url') {
            // Delete document from local storage
            const filePath = `D:/Git-Hub/Document-Management-System/Server/public/uploads/${docName}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).json({ status: 'fail', message: 'Error deleting artifact file' });
                }

                // Update total_used_space in system_settings
                const updateQuery = `
                    UPDATE system_settings 
                    SET value = value - ?
                    WHERE variable_name = 'total_used_space'
                `;
                db.query(updateQuery, [docSize], (err, result) => {
                    if (err) {
                        console.error('Error updating total_used_space:', err);
                        return res.status(500).json({ status: 'fail', message: 'Error updating total_used_space' });
                    }
                });
            });
        }
        // Delete artifact from documents table
        const deleteQuery = "DELETE FROM documents WHERE id = ?";
        db.query(deleteQuery, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted a document [ID: ${id}]`, current_date], (err, result) => {
                if (err) throw err;
            });
            return res.status(200).json({ status: 'success', message: 'Document deleted successfully' });
        });
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