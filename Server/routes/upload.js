const express = require('express');
const multer = require('multer')
const path = require('path');
const verifyUser = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).single('file');

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
        const docName = req.file.originalname;
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
                return res.json({ status: 'success' });
            });
        } catch (err) {
            console.error(err);
            return res.json("Internal Server Error");
        }
    });
});

// Route to add url 
router.post('/addUrl', verifyUser, (req, res) => {
    const { infoHead, url, tags, docType, description, publish } = req.body;
    const ownerAuthorId = req.email;
    const isPublished = publish === 'yes' ? 1 : 0;
    const current_date = new Date();

    const query = "INSERT INTO documents (doc_nm, owner_author_id, doc_path, doc_type, doc_format, assoc_tags, doc_description, doc_status, is_published, date_uploaded, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try {
        db.query(query, [infoHead, ownerAuthorId, url, docType, 'url', tags, description, 'active', isPublished, current_date, req.email], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} uploaded new online document [${infoHead}]`, current_date], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success' });
        });
    } catch (err) {
        console.error(err);
        return res.json("Internal Server Error");
    }
});

module.exports = router;