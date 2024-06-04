const express = require('express')
const cors = require('cors')
const mysql = require("mysql");
const multer = require('multer')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require('path');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));

require("dotenv").config()

// Port
const PORT = process.env.PORT;

// Secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Database
const db = mysql.createConnection({
    user: "dmsadmin",
    host: "localhost",
    password: "Dms@1234",
    database: "dmsdemo"
})

// DB Connection
db.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED");
    }
})

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).single('file');

// Route to Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user with the provided email exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.json("Internal Server Error");
            }
            if (results.length === 0) {
                console.log("User not found");
                return res.json("User not found");
            } else {
                const user = results[0];
                // Compare the provided password with the stored hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    // Generate JWT token
                    jwt.sign({ id: user.id, username: user.username, email: user.email, role_id: user.role_id }, JWT_SECRET_KEY, { expiresIn: '4h' }, (err, token) => {
                        if (err) {
                            console.error(err);
                            return res.json({ error: "Token generation failed" });
                        }
                        // Insert login activity log
                        const log_date = new Date();
                        db.query("INSERT INTO logs (activity, log_date) VALUES (?, ?)", [`User: ${user.email} logged in`, log_date], (err, result) => {
                            if (err) throw err;
                        });
                        console.log(`User ${user.email} successfully logged in`);
                        return res.status(200).json({ token });
                    });
                } else {
                    console.log("Incorrect password");
                    return res.json("Incorrect password");
                }
            }
        });
    } catch (err) {
        console.error(err);
        return res.json("Internal Server Error");
    }
});

// Middleware to verify user token
const verifyUser = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.json({ error: "You are not authorized" });
    } else {
        jwt.verify(token, JWT_SECRET_KEY, {}, (err, decoded) => {
            if (err) {
                return res.json({ error: "Token is not valid" });
            } else {
                req.id = decoded.id;
                req.email = decoded.email;
                req.username = decoded.username;
                req.role_id = decoded.role_id;
                next();
            }
        });
    }
};

// Route to verify user
app.get("/verifyUser", verifyUser, (req, res) => {
    return res.json({ status: "success", username: req.username, role_id: req.role_id });
});

// API to logout
app.post("/logout", verifyUser, (req, res) => {
    const log_date = new Date();
    db.query("INSERT INTO logs (activity, log_date) VALUES (?, ?)", [`User ${req.email} logged out`, log_date], (err, result) => {
        if (err) throw err;
        console.log(`User ${req.email} logged out`);
        return res.json({ status: "success" });
    });
});

// Upload document endpoint
app.post('/uploadDocument', verifyUser, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ status: 'fail', message: err.message });
        }

        const { tags, docType, description, publish } = req.body;
        const filePath = req.file.path;
        const docFormat = path.extname(req.file.originalname).slice(1);
        const ownerAuthorId = req.email;
        const docName = req.file.originalname;
        const isPublished = publish === 'yes' ? 1 : 0;
        const current_date = new Date();

        const query = "INSERT INTO documents (doc_nm, owner_author_id, doc_path, doc_type, doc_format, assoc_tags, doc_description, doc_status, is_published, date_uploaded, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            db.query(query, [docName, ownerAuthorId, filePath, docType, docFormat, tags, description, 'active', isPublished, current_date, req.email], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ status: 'fail', message: err.message });
                }
                db.query("INSERT INTO logs (activity, log_date) VALUES (?, ?)", [`User: ${req.email} uploaded ${docName}`, current_date], (err, result) => {
                    if (err) throw err;
                });
                return res.json({ status: 'success' });
            });
        } catch (err) {
            console.error(err);
            return res.json("Internal Server Error");
        }
    });
});

// Add url endpoint
app.post('/addUrl', verifyUser, (req, res) => {
    const { infoHead, url, tags, docType, description, publish } = req.body;
    const ownerAuthorId = req.email;
    const isPublished = publish === 'yes' ? 1 : 0;
    const current_date = new Date();

    const query = "INSERT INTO documents (doc_nm, owner_author_id, doc_path, doc_type, doc_format, assoc_tags, doc_description, doc_status, is_published, date_uploaded, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try {
        db.query(query, [infoHead, ownerAuthorId, url, docType, 'url', tags, description, 'active', isPublished, current_date, req.email], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'fail', message: err.message });
            }
            db.query("INSERT INTO logs (activity, log_date) VALUES (?, ?)", [`User: ${req.email} added URL: ${url}`, current_date], (err, result) => {
                if (err) throw err;
            });
            return res.json({ status: 'success' });
        });
    } catch (err) {
        console.error(err);
        return res.json("Internal Server Error");
    }
});

// Get document types endpoint
app.get('/documentTypes', verifyUser, (req, res) => {
    const query = "SELECT id, doctype_nm FROM document_type";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: results });
    });
});

// Get document tags endpoint
app.get('/tags', verifyUser, (req, res) => {
    const query = "SELECT id, tag_nm FROM tags WHERE status = 'active'";
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database query error" });
        }
        res.json({ status: "success", data: results });
    });
});

// Create new tags
app.post('/createTag', verifyUser, (req, res) => {
    const { tag_nm } = req.body;
    const created_by = req.email; // Assuming email is stored in req after verification
    const created_at = new Date();

    const query = "INSERT INTO tags (tag_nm, created_by, created_at, status) VALUES (?, ?, ?, 'active')";
    db.query(query, [tag_nm, created_by, created_at], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: "error", message: "Database insertion error" });
        }
        res.json({ status: "success", data: { id: result.insertId, tag_nm } });
    });
});

// Get user artifacts
app.get('/myArtifacts', verifyUser, (req, res) => {
    const query = "SELECT * FROM vw_documents WHERE owner_author_id = ?";
    db.query(query, [req.email], (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: err.message });
        }
        return res.status(200).json({ status: 'success', data: result });
    });
});

// Fetch current system settings
app.get('/systemSettings', verifyUser, (req, res) => {
    const query = 'SELECT * FROM system_settings WHERE variable_name = "file_upload_limit"';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Database query error" });
        }
        if (result.length > 0) {
            res.json({
                status: "success",
                data: {
                    limit: result[0].value,
                    updatedBy: result[0].updated_by,
                    lastUpdated: result[0].last_updated_on,
                },
            });
        } else {
            res.json({ status: "error", message: "No settings found" });
        }
    });
});

// Update system settings
app.post('/updateSystemSettings', verifyUser, (req, res) => {
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
        db.query("INSERT INTO logs (activity, log_date) VALUES (?, ?)", [`User: ${req.email} updated system settings`, current_date], (err, result) => {
            if (err) throw err;
        });
        res.json({ status: "success", message: "System settings updated successfully" });
    });
});

// Server
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))