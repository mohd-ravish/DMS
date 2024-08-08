const db = require('../config/db');

class AuthService {
    async findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                if (err) {
                    return reject(new Error(err.message));
                }
                resolve(results[0]);
            });
        });
    }

    async logActivity(userId, activity) {
        const logDate = new Date();
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO logs (user_id, activity, log_date) VALUES (?, ?, ?)", [userId, activity, logDate], (err, result) => {
                if (err) {
                    return reject(new Error(err.message));
                }
                resolve(result);
            });
        });
    }
}

module.exports = new AuthService;