const schoolService = require('../services/schoolService');
const authService = require('../services/authService');

exports.addSchool = async (req, res) => {
    const { schoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo } = req.body;
    try {
        await schoolService.addSchool(req.id, schoolName, state, address, geoLocation, schoolEmail, contactPerson, contactNo);
        await authService.logActivity(req.id, `User: ${req.email} added new school [${schoolName}]`);
        res.json({ status: 'success', message: 'School added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.fetchMySchools = async (req, res) => {
    try {
        const schools = await schoolService.fetchMySchools(req.id);
        res.status(200).json({ status: 'success', data: schools });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchAllSchools = async (req, res) => {
    try {
        const schools = await schoolService.fetchAllSchools();
        res.status(200).json({ status: 'success', data: schools });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.updateSchoolData = async (req, res) => {
    const { id } = req.params;
    const { school_name, state, address, geo_location, school_email_id, primary_contact_person, contact_no } = req.body;
    try {
        await schoolService.updateSchoolData(req.id, id, school_name, state, address, geo_location, school_email_id, primary_contact_person, contact_no);
        await authService.logActivity(req.id, `User: ${req.email} updated school data with [ID: ${id}]`);
        res.json({ status: 'success', message: 'School data updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.deleteSchool = async (req, res) => {
    const { id } = req.params;
    try {
        await schoolService.deleteSchool(id);
        await authService.logActivity(req.id, `User: ${req.email} deleted a school with [ID: ${id}]`);
        res.json({ status: 'success', message: 'School deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};