const express = require('express');
const verifyUser = require('../middlewares/auth');
const labController = require('../controllers/labController');

const router = express.Router();

router.post('/addLab', verifyUser, labController.addLab);
router.get('/fetchMyLabs', verifyUser, labController.fetchMyLabs);
router.get('/fetchAllLabs', verifyUser, labController.fetchAllLabs);
router.get('/fetchLabsForSchool/:schoolId', verifyUser, labController.fetchLabsForSchool);
router.put('/updateLabData/:id', verifyUser, labController.updateLabData);
router.delete('/deleteLab/:id', verifyUser, labController.deleteLab);

module.exports = router;