const db = require('../config/db');

class SchoolService {
    async addSchool(userId, schoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo) {
        const onBoardedOn = new Date();
        const camelCaseSchoolName = schoolName
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const query = `INSERT INTO schools 
            (school_name, state, address, geo_location, school_email_id, primary_contact_person, contact_no, on_boarded_by, on_boarded_on) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.promise().query(query, [camelCaseSchoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo, userId, onBoardedOn]);
    }

    async fetchMySchools(userId) {
        const query = "SELECT * FROM vw_schools WHERE on_boarded_by = ? ORDER BY id DESC";
        const [results] = await db.promise().query(query, [userId]);
        return results;
    }

    async fetchAllSchools() {
        const query = "SELECT * FROM vw_schools ORDER BY id DESC";
        const [results] = await db.promise().query(query);
        return results;
    }

    async updateSchoolData(userId, schoolId, schoolName, state, address, geoLocation, schoolEmailId, contactPerson, contactNo) {
        const boardedOn = new Date();
        const query = `
            UPDATE schools
            SET school_name = ?, state = ?, address = ?, geo_location = ?, school_email_id = ?, primary_contact_person = ?, contact_no = ?, on_boarded_by = ?, on_boarded_on = ?
            WHERE id = ?
        `;
        await db.promise().query(query, [schoolName, state, address, geoLocation, schoolEmailId, contactPerson, contactNo, userId, boardedOn, schoolId]);
    }

    async deleteSchool(schoolId) {
        const query = `DELETE FROM schools WHERE id = ?`;
        await db.promise().query(query, [schoolId]);
        await db.promise().query("DELETE FROM labs WHERE school_id = ?", [schoolId]);
    }
}

module.exports = new SchoolService();