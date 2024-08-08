const equipmentService = require('../services/equipmentService');
const authService = require('../services/authService');

exports.addEquipment = async (req, res) => {
    const { equipmentName, equipmentType, equipmentQuantity } = req.body;
    try {
        await equipmentService.addEquipment(req.id, equipmentName, equipmentType, equipmentQuantity);
        await authService.logActivity(req.id, `User: ${req.email} added new equipment [${equipmentName}]`);
        res.json({ status: 'success', message: 'Equipment added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.fetchMyEquipments = async (req, res) => {
    try {
        const equipments = await equipmentService.fetchMyEquipments(req.id);
        res.status(200).json({ status: 'success', data: equipments });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchAllEquipments = async (req, res) => {
    try {
        const equipments = await equipmentService.fetchAllEquipments();
        res.status(200).json({ status: 'success', data: equipments });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.allocateEquipment = async (req, res) => {
    const { equipmentId, schoolId, labId, allocatedQuantity } = req.body;
    try {
        await equipmentService.allocateEquipment(req.id, equipmentId, schoolId, labId, allocatedQuantity);
        await authService.logActivity(req.id, `User: ${req.email} allocated equipment with [ID: ${equipmentId}]`);
        res.json({ status: 'success', message: 'Equipment allocated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateEquipmentData = async (req, res) => {
    const { id } = req.params;
    const { equipment_name, equipment_type } = req.body;
    try {
        await equipmentService.updateEquipmentData(req.id, id, equipment_name, equipment_type);
        await authService.logActivity(req.id, `User: ${req.email} updated data of equipment [${equipment_name}]`);
        res.json({ status: 'success', message: 'Equipment data updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.deleteEquipment = async (req, res) => {
    const { id } = req.params;
    try {
        await equipmentService.deleteEquipment(id);
        await authService.logActivity(req.id, `User: ${req.email} deleted a equipment with [ID: ${id}]`);
        res.json({ status: 'success', message: 'Equipment deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};
