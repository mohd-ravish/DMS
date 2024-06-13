const express = require('express');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const verifyUser = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

// Define the allowed file formats
const allowedFormats = ['jpg', 'png', 'jpeg', 'doc', 'pdf', 'docx', 'xls', 'xlsx', 'zip', 'csv', 'ppt', 'pptx', 'txt'];

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const filePath = path.join(__dirname, '..', 'public', 'uploads', file.originalname);
        if (fs.existsSync(filePath)) {  // If a file with the same name is already present in the directory then append it with the current time
            const now = new Date();
            const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '');  // Get HHMMSS format
            const originalName = path.parse(file.originalname).name;
            const extension = path.extname(file.originalname);
            cb(null, `${originalName}_${timeString}${extension}`);
        } else {
            cb(null, file.originalname);
        }
    }
});

// Function to check if the file format is valid
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).slice(1).toLowerCase();
    if (allowedFormats.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'));
    }
};

// Initialize Multer with storage and file filter
const upload = multer({ storage, fileFilter }).single('file');

// Route to upload document 
router.post('/uploadDocument', verifyUser, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ status: 'fail', message: err.message });
        }
        const { tags, docType, description, publish } = req.body;
        const filePath = req.file.path;
        const docFormat = path.extname(req.file.originalname).slice(1);
        const ownerAuthorId = req.email;
        const docName = req.file.filename;
        const isPublished = publish === 'yes' ? 1 : 0;
        const current_date = new Date();

        const query = "INSERT INTO documents (doc_nm, owner_author_id, doc_path, doc_type, doc_format, assoc_tags, doc_description, doc_status, is_published, date_uploaded, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            db.query(query, [docName, ownerAuthorId, filePath, docType, docFormat, tags, description, 'active', isPublished, current_date, req.email], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ status: 'fail', message: err.message });
                }
                db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} uploaded new document [${docName}]`, current_date], (err, result) => {
                    if (err) throw err;
                });
                return res.json({ status: 'success', message: 'Document uploaded successfully' });
            });
        } catch (err) {
            console.error(err);
            return res.json("Internal Server Error");
        }
    });
});

// Route to upload url 
router.post('/addUrl', verifyUser, (req, res) => {
    const { infoHead, url, tags, docType, description, publish } = req.body;
    const ownerAuthorId = req.email;
    const isPublished = publish === 'yes' ? 1 : 0;
    const current_date = new Date();
    const assocTags = tags.join(',');  // Convert tags array to a comma-separated string

    const query = `INSERT INTO documents 
        (doc_nm, owner_author_id, doc_path, doc_type, doc_format, assoc_tags, doc_description, doc_status, is_published, date_uploaded, uploaded_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        db.query(query, [infoHead, ownerAuthorId, url, docType, 'url', assocTags, description, 'active', isPublished, current_date, req.email], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} uploaded new online document [${infoHead}]`, current_date], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'URL added successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});


// Route to update document metadata
router.put('/updateDocument/:id', verifyUser, async (req, res) => {
    const { id } = req.params;
    const { tags, docType, description, publish, status } = req.body;
    const assocTags = tags.join(',');  // Convert tags array to a comma-separated string
    const current_date = new Date();
    try {
        const query = 'UPDATE documents SET assoc_tags = ?, doc_type = ?, doc_description = ?, doc_status = ?, is_published = ? WHERE id = ?';
        db.query(query, [assocTags, docType, description, status, publish, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ status: "error", message: "Database update error" });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} updated a document with ID: ${id}`, current_date], (err, result) => {
                if (err) throw err;
            });
            res.json({ status: "success", message: "Document metadata updated successfully" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to update metadata' });
    }
});

module.exports = router;