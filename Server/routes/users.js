const express = require('express');
const verifyUser = require('../middlewares/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/fetchUsers', verifyUser, userController.fetchUsers);
router.put('/changeUserRole', verifyUser, userController.changeUserRole);
router.delete('/deleteUser/:id', verifyUser, userController.deleteUser);
router.get('/getControlAccessInfo', verifyUser, userController.getControlAccessInfo);
router.get('/fetchControlAccessUsers', verifyUser, userController.fetchControlAccessUsers);
router.put('/updateUserControlAccess/:id', verifyUser, userController.updateUserControlAccess);
router.post('/fetchUserActivity', verifyUser, userController.fetchUserActivity);

module.exports = router;