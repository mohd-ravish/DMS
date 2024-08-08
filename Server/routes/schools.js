const express = require('express');
const verifyUser = require('../middlewares/auth');
const schoolController = require('../controllers/schoolController');

const router = express.Router();

router.post('/addSchool', verifyUser, schoolController.addSchool);
router.get('/fetchMySchools', verifyUser, schoolController.fetchMySchools);
router.get('/fetchAllSchools', verifyUser, schoolController.fetchAllSchools);
router.put('/updateSchoolData/:id', verifyUser, schoolController.updateSchoolData);
router.delete('/deleteSchool/:id', verifyUser, schoolController.deleteSchool);

module.exports = router;