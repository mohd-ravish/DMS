const express = require('express');
const verifyUser = require('../middlewares/auth');
const settingsController = require('../controllers/settingsController');

const router = express.Router();

router.get('/fetchFileUploadLimit', verifyUser, settingsController.fetchFileUploadLimit);
router.post('/updateFileUploadLimit', verifyUser, settingsController.updateFileUploadLimit);
router.get('/fetchAllocatedUsedSpace', verifyUser, settingsController.fetchAllocatedUsedSpace);
router.post('/updateAllocatedSpace', verifyUser, settingsController.updateAllocatedSpace);
router.get('/fetchDocFormats', verifyUser, settingsController.fetchDocFormats);
router.post('/updateDocFormatControl', verifyUser, settingsController.updateDocFormatControl);

module.exports = router;