const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route to add lab
router.post('/addLab', verifyUser, (req, res) => {
    const { labName, labType, schoolId } = req.body;
    const labAddedBy = req.email;
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

// Route get user's labs
router.get('/getMyLabs', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_labs WHERE lab_added_by = ? ORDER BY id DESC";
    db.query(query, [req.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// // Route to fetch all labs 
router.get('/getAllLabs', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_labs ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to fetch labs for a specific school
router.get('/getLabsForSchool/:schoolId', verifyUser, (req, res) => {
    const { schoolId } = req.params;

    const query = `SELECT id, lab_name FROM vw_labs WHERE school_id = ?`;

    try {
        db.query(query, [schoolId], (err, results) => {
            if (err) {
                console.error(err);
                return res.json({ status: 'fail', message: err.message });
            }
            return res.json({ status: 'success', labs: results });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to update lab data
router.put('/updateLabData/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const { lab_name, lab_type, school_id } = req.body;
    const lab_added_by = req.id;
    const lab_added_on = new Date();
    const query = `
        UPDATE labs
        SET lab_name = ?, lab_type = ?, school_id = ?, lab_added_by = ?, lab_added_on = ?
        WHERE id = ?
    `;
    try {
        db.query(query, [lab_name, lab_type, school_id, lab_added_by, lab_added_on, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [lab_added_by, `User: ${req.email} updated lab data with ID: [${id}]`, lab_added_on], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'Lab data updated successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to delete lab
router.delete('/deleteLab/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const currentTime = new Date();

    const query = `DELETE FROM labs WHERE id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ status: 'fail', message: err.message });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted lab with ID: [${id}]`, currentTime], (err, result) => {
            if (err) throw err;
        });
        return res.json({ status: 'success', message: 'School deleted successfully' });
    });
});

module.exports = router;