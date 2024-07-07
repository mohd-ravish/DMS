const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route to add school
router.post('/addSchool', verifyUser, (req, res) => {
    const { schoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo } = req.body;
    const onBoardedBy = req.id;
    const onBoardedOn = new Date();
    const query = `INSERT INTO schools 
        (school_name, state, address, geo_location, school_email_id, primary_contact_person, contact_no, on_boarded_by, on_boarded_on) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        db.query(query, [schoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo, onBoardedBy, onBoardedOn], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} added new school [${schoolName}]`, onBoardedOn], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'School added successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to fetch school names 
router.get('/getSchoolNames', verifyUser, (req, res) => {
    const query = "SELECT id, school_name FROM vw_schools";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to add lab
router.post('/addLab', verifyUser, (req, res) => {
    const { labName, labType, schoolId } = req.body;
    const labAddedBy = req.id;
    const labAddedOn = new Date();
    const query = `INSERT INTO labs 
        (lab_name, lab_type, school_id, lab_added_by, lab_added_on) 
        VALUES (?, ?, ?, ?, ?)`;

    try {
        db.query(query, [labName, labType, schoolId, labAddedBy, labAddedOn], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} added new lab [${labName}]`, labAddedOn], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'Lab added successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to add equipment
router.post('/addEquipment', verifyUser, (req, res) => {
    const { equipmentName, equipmentType } = req.body;
    const equipmentAddedBy = req.id;
    const equipmentAddedOn = new Date();
    const query = `INSERT INTO equipments 
        (equipment_name, equipment_type, equipment_added_by, equipment_added_on) 
        VALUES (?, ?, ?, ?)`;

    try {
        db.query(query, [equipmentName, equipmentType, equipmentAddedBy, equipmentAddedOn], (err, result) => {
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

module.exports = router;