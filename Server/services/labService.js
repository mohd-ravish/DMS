const db = require('../config/db');

class LabService {
    async addLab(userId, labName, labType, schoolId) {
        const labAddedOn = new Date();
        const query = `INSERT INTO labs 
            (lab_name, lab_type, school_id, lab_added_by, lab_added_on) 
            VALUES (?, ?, ?, ?, ?)`;
        await db.promise().query(query, [labName, labType, schoolId, userId, labAddedOn]);
    }

    async fetchMyLabs(userId) {
        const query = "SELECT * FROM vw_labs WHERE lab_added_by = ? ORDER BY id DESC";
        const [results] = await db.promise().query(query, [userId]);
        return results;
    }

    async fetchAllLabs() {
        const query = "SELECT * FROM vw_labs ORDER BY id DESC";
        const [results] = await db.promise().query(query);
        return results;
    }

    async fetchLabsForSchool(schoolId) {
        const query = `SELECT id, lab_name FROM vw_labs WHERE school_id = ?`;
        const [results] = await db.promise().query(query, [schoolId]);
        return results;
    }

    async updateLabData(userId, labId, labName, labType, schoolId) {
        const labAddedOn = new Date();
        const query = `
            UPDATE labs
            SET lab_name = ?, lab_type = ?, school_id = ?, lab_added_by = ?, lab_added_on = ?
            WHERE id = ?
        `;

        await db.promise().query(query, [labName, labType, schoolId, userId, labAddedOn, labId]);
    }

    async deleteLab(labId) {
        const query = `DELETE FROM labs WHERE id = ?`;
        await db.promise().query(query, [labId]);
    }
}

module.exports = new LabService();