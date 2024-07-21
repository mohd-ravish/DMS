const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route to add school
router.post('/addSchool', verifyUser, (req, res) => {
    const { schoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo } = req.body;
    const onBoardedBy = req.id;
    const onBoardedOn = new Date();

    // Convert school name to camel case
    const camelCaseSchoolName = schoolName
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const query = `INSERT INTO schools 
        (school_name, state, address, geo_location, school_email_id, primary_contact_person, contact_no, on_boarded_by, on_boarded_on) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        db.query(query, [camelCaseSchoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo, onBoardedBy, onBoardedOn], (err, result) => {
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

// Route get user's schools
router.get('/getMySchools', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_schools WHERE on_boarded_by = ? ORDER BY id DESC";
    db.query(query, [req.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to get all schools 
router.get('/getAllSchools', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_schools ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to update School data
router.put('/updateSchoolData/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const { school_name, state, address, geo_location, school_email_id, primary_contact_person, contact_no } = req.body;
    const boardedBy = req.id;
    const boardedOn = new Date();
    const query = `
        UPDATE schools
        SET school_name = ?, state = ?, address = ?, geo_location = ?, school_email_id = ?, primary_contact_person = ?, contact_no = ?, on_boarded_by = ?, on_boarded_on = ?
        WHERE id = ?
    `;
    try {
        db.query(query, [school_name, state, address, geo_location, school_email_id, primary_contact_person, contact_no, boardedBy, boardedOn, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [boardedBy, `User: ${req.email} updated school data with ID: [${id}]`, boardedOn], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'School data updated successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to delete School
router.delete('/deleteSchool/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const currentTime = new Date();

    const query = `DELETE FROM schools WHERE id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ status: 'fail', message: err.message });
        }
        db.query("DELETE FROM labs WHERE school_id = ?", [id], (err, result) => {
            if (err) throw err;
        });
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted school with ID: [${id}]`, currentTime], (err, result) => {
            if (err) throw err;
        });
        return res.json({ status: 'success', message: 'School deleted successfully' });
    });
});

module.exports = router;