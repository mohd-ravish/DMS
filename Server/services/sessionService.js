const db = require('../config/db');
const path = require('path');
const fs = require('fs');

class SessionService {
    async setupSession(userId, sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, folderName) {
        const sessionSetupOn = new Date();
        const query = `INSERT INTO sessions 
            (session_title, session_host, session_date, session_time, school_id, lab_id, invitees, session_folder_name, session_setup_by, session_setup_on) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.promise().query(query, [sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, 'attendees.xlsx', folderName, userId, sessionSetupOn]);
        const sessionId = result.insertId;
        return sessionId;
    }

    async fetchMySessions(userId) {
        const query = "SELECT * FROM vw_sessions WHERE session_setup_by = ? ORDER BY id DESC";
        const [results] = await db.promise().query(query, [userId]);
        return results;
    }

    async fetchAllSessions() {
        const query = "SELECT * FROM vw_sessions ORDER BY id DESC";
        const [results] = await db.promise().query(query);
        return results;
    }

    async updateSessionData(userId, sessionId, sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, sessionStatus) {
        const sessionUpdatedOn = new Date();
        const query = `
            UPDATE sessions
            SET session_title = ?, session_host = ?, session_date = ?, session_time = ?, school_id = ?, lab_id = ?, session_status = ?, session_updated_by = ?, session_updated_on = ?
            WHERE id = ?
        `;

        await db.promise().query(query, [sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, sessionStatus, userId, sessionUpdatedOn, sessionId]);
    }

    async deleteSession(sessionId) {
        const query = `DELETE FROM sessions WHERE id = ?`;
        await db.promise().query(query, [sessionId]);
    }

    async getStudentList(sessionFolderName) {
        const filePath = path.join(process.env.SESSION_UPLOADS_PATH, sessionFolderName, 'attendees.xlsx');
        const data = await fs.promises.readFile(filePath);
        return data;
    }

    async saveStudentsList(tempFilePath, sessionFolderName, presentCount) {
        const filePath = path.join(process.env.SESSION_UPLOADS_PATH, sessionFolderName, 'attendees.xlsx');
        await fs.promises.rename(tempFilePath, filePath);
        const query = 'UPDATE sessions SET attendees_count = ? WHERE session_folder_name = ?';
        await db.promise().query(query, [presentCount, sessionFolderName]);
    }
}

module.exports = new SessionService();