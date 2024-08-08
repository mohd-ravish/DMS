const express = require('express');
const verifyUser = require('../middlewares/auth');
const documentsController = require('../controllers/uploadController');

const router = express.Router();

router.post('/uploadDocument', verifyUser, documentsController.uploadDocument);
router.post('/addUrl', verifyUser, documentsController.addUrl);
router.put('/updateDocumentMetadata/:id', verifyUser, documentsController.updateDocumentMetadata);

module.exports = router;