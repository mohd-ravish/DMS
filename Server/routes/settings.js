const express = require('express');
const verifyUser = require('../middlewares/auth');
const db = require('../config/db');

const router = express.Router();

// Route to fetch current upload limit
router.get('/fetchSystemSettings', verifyUser, (req, res) => {
    const query = 'SELECT * FROM vw_system_settings WHERE variable_name = "file_upload_limit"';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Database query error" });
        }
        if (results.length > 0) {
            res.json({
                status: "success",
                data: {
                    limit: results[0].value,
                    updatedBy: results[0].updated_by,
                    lastUpdated: results[0].last_updated_on,
                    allowedToChange: results[0].allowed_to_change,
                },
            });
        } else {
            res.json({ status: "error", message: "No settings found" });
        }
    });
});

// Route to update upload limit
router.post('/updateSystemSettings', verifyUser, (req, res) => {
    const { newLimit } = req.body;
    const current_date = new Date();
    const query = `
        UPDATE system_settings 
        SET value = ?, updated_by = ?, last_updated_on = ?
        WHERE variable_name = "file_upload_limit"
    `;
    db.query(query, [newLimit, req.email, current_date], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database update error" });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} updated upload limit to ${newLimit} KB`, current_date], (err, result) => {
            if (err) throw err;
        });
        res.json({ status: "success", message: "Upload Limit updated successfully" });
    });
});

// Route to fetch alloacted space
router.get('/fetchAllocatedUsedSpace', verifyUser, (req, res) => {
    const query = `
        SELECT variable_name, value, last_updated_on, updated_by
        FROM vw_system_settings
        WHERE variable_name IN ('total_allocated_space', 'total_used_space')
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ status: "error", message: "Database query error" });
        }

        // Construct response based on the queried data
        const data = {};
        results.forEach(row => {
            data[row.variable_name] = {
                value: row.value,
                last_updated_on: row.last_updated_on,
                updated_by: row.updated_by
            };
        });

        if (Object.keys(data).length > 0) {
            res.json({ status: "success", data });
        } else {
            res.status(404).json({ status: "error", message: "No settings found" });
        }
    });
});

// Route to update Allocated Space
router.post('/updateAllocatedSpace', verifyUser, (req, res) => {
    const { newAllocateSpace } = req.body;
    const newAllocateSpaceInKB = newAllocateSpace * 1024 * 1024;
    const current_date = new Date();
    const query = `
        UPDATE system_settings 
        SET value = ?, updated_by = ?, last_updated_on = ?
        WHERE variable_name = "total_allocated_space"
    `;
    db.query(query, [newAllocateSpaceInKB, req.email, current_date], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database update error" });
        }
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} updated total allocated space to ${newAllocateSpace} GB`, current_date], (err, result) => {
            if (err) throw err;
        });
        res.json({ status: "success", message: "New space allocated successfully" });
    });
});

// Router to fetch Doc Formats
// router.get('/fetchDocFormats', verifyUser, (req, res) => {
//     const query = "SELECT * FROM doc_formats";
//     db.query(query, (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ status: "error", message: "Database query error" });
//         }
//         res.json({ status: "success", data: results });
//     });
// });
router.get('/fetchDocFormats', verifyUser, async (req, res) => {
    try {
        const [results] = await db.promise().query("SELECT value FROM vw_system_settings WHERE variable_name = 'doc_formats'");
        if (results.length === 0) {
            return res.json({ status: 'fail', message: 'No document formats found' });
        }
        const formatsString = results[0].value;
        const formatsArray = formatsString.split(',').map(format => {
            const [formatName, controlId] = format.split(':');
            return { formatName, controlId: parseInt(controlId) };
        });
        res.json({ status: 'success', data: formatsArray });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Database query error' });
    }
});

// Route to update document format control bit
// router.post('/updateDocFormatControl', verifyUser, (req, res) => {
//     const { id, control_id } = req.body;
//     const current_date = new Date();
//     const query = "UPDATE doc_formats SET control_id = ? WHERE id = ?";
//     db.query(query, [control_id, id], (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ status: "error", message: "Database update error" });
//         }
//         db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [req.id, `User: ${req.email} updated doc formats`, current_date], (err, result) => {
//             if (err) throw err;
//         });
//         res.json({ status: "success", message: "Document format updated successfully" });
//     });
// });
router.post('/updateDocFormatControl', verifyUser, async (req, res) => {
    const { formatName, controlId } = req.body;
    try {
        const [results] = await db.promise().query("SELECT value FROM system_settings WHERE variable_name = 'doc_formats'");
        if (results.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'Document formats not found' });
        }
        const formatsString = results[0].value;
        const formatsArray = formatsString.split(',').map(format => {
            const [name, id] = format.split(':');
            return { name, id: parseInt(id) };
        });
        const updatedFormatsArray = formatsArray.map(format => {
            if (format.name === formatName) {
                format.id = controlId;
            }
            return format;
        });
        const updatedFormatsString = updatedFormatsArray.map(format => `${format.name}:${format.id}`).join(',');
        await db.promise().query("UPDATE system_settings SET value = ?, updated_by = ?, last_updated_on = NOW() WHERE variable_name = 'doc_formats'", [updatedFormatsString, req.email]);
        db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, NOW())", [req.id, `User: ${req.email} updated doc formats`], (err) => {
            if (err) throw err;
        });
        res.json({ status: 'success', message: 'Document format updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Database update error' });
    }
});

module.exports = router;