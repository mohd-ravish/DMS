const express = require('express');
const verifyUser = require('../middlewares/auth');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/setupSession', verifyUser, sessionController.setupSession);
router.get('/fetchMySessions', verifyUser, sessionController.fetchMySessions);
router.get('/fetchAllSessions', verifyUser, sessionController.fetchAllSessions);
router.put('/updateSessionData/:id', verifyUser, sessionController.updateSessionData);
router.delete('/deleteSession/:id', verifyUser, sessionController.deleteSession);
router.get('/getStudentList/:sessionFolderName', sessionController.getStudentList);
router.post('/saveStudentsList/:sessionFolderName', sessionController.saveStudentsList);

module.exports = router;