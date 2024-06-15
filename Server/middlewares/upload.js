const multer = require('multer')
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

// Middleware to fetch allowed formats from the database
const fetchAllowedFormats = async () => {
    const [results] = await db.promise().query("SELECT doc_format_nm FROM doc_formats WHERE control_id = 1");
    return results.map(format => format.doc_format_nm);
};

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
const fileFilter = async (req, file, cb) => {
    try {
        const allowedFormats = await fetchAllowedFormats();
        const ext = path.extname(file.originalname).slice(1).toLowerCase();
        if (allowedFormats.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file format'));
        }
    } catch (error) {
        cb(error);
    }
};

// Initialize Multer with storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;