const mysql = require("mysql");

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

module.exports = db;