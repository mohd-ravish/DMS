const express = require('express');
const verifyUser = require('../middlewares/auth');
const equipmentController = require('../controllers/equipmentController');

const router = express.Router();

router.post('/addEquipment', verifyUser, equipmentController.addEquipment);
router.get('/fetchMyEquipments', verifyUser, equipmentController.fetchMyEquipments);
router.get('/fetchAllEquipments', verifyUser, equipmentController.fetchAllEquipments);
router.post('/allocateEquipment', verifyUser, equipmentController.allocateEquipment);
router.put('/updateEquipmentData/:id', verifyUser, equipmentController.updateEquipmentData);
router.delete('/deleteEquipment/:id', verifyUser, equipmentController.deleteEquipment);

module.exports = router;