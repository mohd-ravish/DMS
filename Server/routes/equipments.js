const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route to add equipment
router.post('/addEquipment', verifyUser, (req, res) => {
    const { equipmentName, equipmentType, equipmentQuantity } = req.body;
    const equipmentAddedBy = req.id;
    const equipmentAddedOn = new Date();
    const query = `INSERT INTO equipments 
        (equipment_name, equipment_type, equipment_quantity, equipment_added_by, equipment_added_on) 
        VALUES (?, ?, ?, ?, ?)`;

    try {
        db.query(query, [equipmentName, equipmentType, equipmentQuantity, equipmentAddedBy, equipmentAddedOn], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} added new equipment [${equipmentName}]`, equipmentAddedOn], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'Equipment added successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route get user's equipments
router.get('/getMyEquipments', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_equipments WHERE equipment_added_by = ? ORDER BY id DESC";
    db.query(query, [req.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to fetch all equipments 
router.get('/getAllEquipments', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_equipments ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to allocate the equipment
router.post('/allocateEquipment', verifyUser, (req, res) => {
    const { equipmentId, schoolId, labId, allocatedQuantity } = req.body;
    const equipmentAllocatedBy = req.id;
    const equipmentAllocatedOn = new Date();
    const query = `INSERT INTO equipments_allocation
        (equipment_id, school_id, lab_id, allocated_quantity, allocated_by, allocated_on) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        db.query(query, [equipmentId, schoolId, labId, allocatedQuantity, equipmentAllocatedBy, equipmentAllocatedOn], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.promise().query("UPDATE equipments SET equipment_quantity = equipment_quantity - ? WHERE id = ?", [allocatedQuantity, equipmentId]);
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} allocated a new equipment with ID: [${equipmentId}]`, equipmentAllocatedOn], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'Equipment allocated successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to update equipment data
router.put('/updateEquipmentData/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const { equipment_name, equipment_type } = req.body;
    const equipment_added_by = req.id;
    const equipment_added_on = new Date();
    const query = `
        UPDATE equipments
        SET equipment_name = ?, equipment_type = ?, equipment_added_by = ?, equipment_added_on = ?
        WHERE id = ?
    `;
    try {
        db.query(query, [equipment_name, equipment_type, equipment_added_by, equipment_added_on, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [equipment_added_by, `User: ${req.email} updated equipment data with ID: [${id}]`, equipment_added_on], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'Equipment data updated successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to delete equipment
router.delete('/deleteEquipment/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const currentTime = new Date();

    const query = `DELETE FROM equipments WHERE id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ status: 'fail', message: err.message });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted equipment with ID: [${id}]`, currentTime], (err, result) => {
            if (err) throw err;
        });
        return res.json({ status: 'success', message: 'Equipment deleted successfully' });
    });
});

module.exports = router;