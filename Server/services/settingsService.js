const db = require('../config/db');

class SettingsService {
    async fetchFileUploadLimit() {
        const query = 'SELECT * FROM vw_system_settings WHERE variable_name = "file_upload_limit"';
        const [results] = await db.promise().query(query);
        return results[0];
    }

    async updateFileUploadLimit(newLimit, email) {
        const current_date = new Date();
        const query = `
            UPDATE system_settings 
            SET value = ?, updated_by = ?, last_updated_on = ?
            WHERE variable_name = "file_upload_limit"
        `;
        await db.promise().query(query, [newLimit, email, current_date]);
    }

    async fetchAllocatedUsedSpace() {
        const query = `
            SELECT variable_name, value, last_updated_on, updated_by
            FROM vw_system_settings
            WHERE variable_name IN ('total_allocated_space', 'total_used_space')
        `;
        const [results] = await db.promise().query(query);
        return results;
    }

    async updateAllocatedSpace(newAllocateSpaceInKB, email) {
        const current_date = new Date();
        const query = `
            UPDATE system_settings 
            SET value = ?, updated_by = ?, last_updated_on = ?
            WHERE variable_name = "total_allocated_space"
        `;
        await db.promise().query(query, [newAllocateSpaceInKB, email, current_date]);
    }

    async fetchDocFormats() {
        const query = "SELECT value FROM vw_system_settings WHERE variable_name = 'doc_formats'";
        const [results] = await db.promise().query(query);
        return results[0];
    }

    async updateDocFormatControl(updatedFormatsString, email) {
        const query = `
            UPDATE system_settings 
            SET value = ?, updated_by = ?, last_updated_on = NOW()
            WHERE variable_name = 'doc_formats'
        `;
        await db.promise().query(query, [updatedFormatsString, email]);
    }
}

module.exports = new SettingsService();