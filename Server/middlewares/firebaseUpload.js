const multer = require('multer');
const path = require('path');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const db = require('../config/db');
const storage = require('../config/firebase');

// To fetch allowed formats from the database
const fetchAllowedFormats = async () => {
    const [results] = await db.promise().query("SELECT value FROM system_settings WHERE variable_name = 'doc_formats'");
    if (results.length === 0) {
        return [];
    }
    const formatsString = results[0].value;
    const formatsArray = formatsString.split(',').map(format => {
        const [formatName, controlId] = format.split(':');
        return { formatName, controlId: parseInt(controlId) };
    });
    return formatsArray.filter(format => format.controlId === 1).map(format => format.formatName);
};

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

const multerStorage = multer.memoryStorage();

const upload = multer({ storage: multerStorage, fileFilter: fileFilter });

const uploadToFirebase = async (fileBuffer, originalName) => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0].replace(/:/g, ''); // Get HHMMSS format
    const baseName = path.parse(originalName).name;
    const extension = path.extname(originalName);
    const newFileName = `${baseName}_${timeString}${extension}`;
    const storageRef = ref(storage, `uploads/${newFileName}`);
    await uploadBytes(storageRef, fileBuffer);
    const downloadURL = await getDownloadURL(storageRef);
    return { newFileName, downloadURL };
};

const handleFileUpload = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    try {
        const originalName = req.file.originalname;
        const fileBuffer = req.file.buffer;
        const { newFileName, downloadURL } = await uploadToFirebase(fileBuffer, originalName);
        req.file.filenameWithTimestamp = newFileName;
        req.fileDownloadURL = downloadURL;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { upload, handleFileUpload };