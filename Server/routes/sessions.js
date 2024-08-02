const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const { upload, updateUpload } = require('../middlewares/studentListUpload');

const router = express.Router();

// Route to setup session
router.post('/sessionSetup', verifyUser, (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'fail', message: 'Failed to upload file' });
        }

        // Now that the file is handled, process the form data
        const { sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId } = req.body;
        const sessionSetupBy = req.id;
        const sessionSetupOn = new Date();
        const folderName = req.folderName;

        const query = `INSERT INTO sessions 
            (session_title, session_host, session_date, session_time, school_id, lab_id, invitees, session_folder_name, session_setup_by, session_setup_on) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        try {
            db.query(query, [sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, 'attendees.xlsx', folderName, sessionSetupBy, sessionSetupOn], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ status: 'fail', message: err.message });
                }
                const sessionId = result.insertId; // Get the inserted session ID

                db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [sessionSetupBy, `User: ${req.email} setup a new session [${sessionTitle}] on [${sessionSetupOn}]`, sessionSetupOn], (err, result) => {
                    if (err) throw err;
                });

                return res.json({ status: 'success', message: 'Session Setup successful', sessionId: sessionId });
            });
        } catch (err) {
            console.error(err);
            return res.json({ status: 'error', message: 'Internal Server Error' });
        }
    });
});

// Route get user's sessions
router.get('/getMySessions', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_sessions WHERE session_setup_by = ? ORDER BY id DESC";
    db.query(query, [req.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to get all sessions 
router.get('/getAllSessions', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_sessions ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Route to update session data
router.put('/updateSessionData/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const { session_title, session_host, session_date, session_time, school_id, lab_id, session_status } = req.body;
    const sessionUpdatedBy = req.id;
    const sessionUpdatedOn = new Date();
    const query = `
        UPDATE sessions
        SET session_title = ?, session_host = ?, session_date = ?, session_time = ?, school_id = ?, lab_id = ?, session_status = ?, session_updated_by = ?, session_updated_on = ?
        WHERE id = ?
    `;
    try {
        db.query(query, [session_title, session_host, session_date, session_time, school_id, lab_id, session_status, sessionUpdatedBy, sessionUpdatedOn, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [sessionUpdatedBy, `User: ${req.email} updated session data with ID: [${id}]`, sessionUpdatedOn], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success', message: 'Session data updated successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Route to delete session
router.delete('/deleteSession/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const currentTime = new Date();

    const query = `DELETE FROM sessions WHERE id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ status: 'fail', message: err.message });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} deleted a session with ID: [${id}]`, currentTime], (err, result) => {
            if (err) throw err;
        });
        return res.json({ status: 'success', message: 'Session deleted successfully' });
    });
});

// Route to fetch the XLSX file
router.get('/getStudentList/:sessionFolderName', (req, res) => {
    const { sessionFolderName } = req.params;
    const filePath = path.join(__dirname, '../public/sessions', sessionFolderName, 'attendees.xlsx');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        res.setHeader('Content-Disposition', 'attachment; filename=attendees.xlsx');
        res.setHeader('Content-Type', 'application/vnd.ms-excel');
        res.send(data);
    });
});

// Route to upload and update the XLS file
router.post('/saveStudentsList/:sessionFolderName', (req, res) => {
    updateUpload.single('file')(req, res, (err) => {
        if (err) {
            return res.json({ status: 'fail', message: err.message });
        }

        const { sessionFolderName } = req.params;
        const { presentCount } = req.body;
        const filePath = path.join(__dirname, '../public/sessions', sessionFolderName, 'attendees.xlsx');

        fs.rename(req.file.path, filePath, (err) => {
            if (err) {
                return res.status(500).send('Failed to update the file');
            }
            // Update the session table with the attendees count
            const query = 'UPDATE sessions SET attendees_count = ? WHERE session_folder_name = ?';
            db.query(query, [presentCount, sessionFolderName], (err, result) => {
                if (err) {
                    return res.status(500).send('Failed to update session table');
                }
                res.send('File updated successfully.');
            });
        });
    });
});


module.exports = router;