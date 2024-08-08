const multer = require('multer')
const path = require('path');
const fs = require('fs');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '');  // Get HHMMSS format
        const folderName = `${timeString}`;

        req.folderName = folderName; // Store the folder name in the request object
        const dest = path.join(process.env.SESSION_UPLOADS_PATH, folderName);

        // Ensure the directory exists
        fs.mkdirSync(dest, { recursive: true });

        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, 'attendees.xlsx');
    }
});

// Setup multer to update files
const updateStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { sessionFolderName } = req.params;
        const dest = path.join(process.env.SESSION_UPLOADS_PATH, sessionFolderName);

        // Ensure the directory exists
        fs.mkdirSync(dest, { recursive: true });

        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, 'attendees.xlsx'); // Set the file name
    }
});

// Initialize Multer with storage 
const updateUpload = multer({ storage: updateStorage });
const upload = multer({ storage: storage });

module.exports = { upload, updateUpload };