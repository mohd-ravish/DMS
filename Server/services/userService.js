const db = require('../config/db');

class UserService {
    async fetchUsers() {
        const query = "SELECT * FROM vw_users";
        const [results] = await db.promise().query(query);
        return results;
    }

    async changeUserRole(userId, newRoleId) {
        const query = "UPDATE users SET role_id = ? WHERE id = ?";
        const [result] = await db.promise().query(query, [newRoleId, userId]);
        return result;
    }

    async deleteUser(userId) {
        const query = "DELETE FROM users WHERE id = ?";
        const [result] = await db.promise().query(query, [userId]);
        return result;
    }

    async getControlAccessInfo() {
        const query = "SELECT * FROM control_access WHERE side_bar_option = 'demo'";
        const [results] = await db.promise().query(query);
        return results;
    }

    async fetchControlAccessUsers() {
        const query = "SELECT * FROM vw_control_access";
        const [results] = await db.promise().query(query);
        return results;
    }

    async updateUserControlAccess(newHasAccess) {
        const query = "UPDATE control_access SET has_access = ? WHERE side_bar_option = 'demo'";
        const [result] = await db.promise().query(query, [newHasAccess]);
        return result;
    }

    async fetchUserActivity(userId, period) {
        const query = `
            SELECT * FROM vw_logs
            WHERE user_id = ? AND log_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY) ORDER BY log_id DESC
        `;
        const [results] = await db.promise().query(query, [userId, parseInt(period)]);
        return results;
    }
}

module.exports = new UserService;