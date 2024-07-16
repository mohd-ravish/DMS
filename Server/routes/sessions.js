const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route to setup session
router.post('/sessionSetup', verifyUser, (req, res) => {
    const { sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, invitees } = req.body;
    const sessionSetupBy = req.id;
    const sessionSetupOn = new Date();
    const query = `INSERT INTO sessions 
        (session_title, session_host, session_date, session_time, school_id, lab_id, invitees, session_setup_by, session_setup_on) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        db.query(query, [sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, invitees, sessionSetupBy, sessionSetupOn], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [sessionSetupBy, `User: ${req.email} setup a new session [${sessionTitle}] on [${sessionSetupOn}]`, sessionSetupOn], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'Session Setup successfull' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

module.exports = router;