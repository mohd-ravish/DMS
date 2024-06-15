const mysql = require("mysql2");

// Database
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// DB Connection
db.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED");
    }
})

module.exports = db;