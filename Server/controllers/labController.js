const labService = require('../services/labService');
const authService = require('../services/authService');

exports.addLab = async (req, res) => {
    const { labName, labType, schoolId } = req.body;
    try {
        await labService.addLab(req.id, labName, labType, schoolId);
        await authService.logActivity(req.id, `User: ${req.email} added a new lab [${labName}]`);
        res.json({ status: 'success', message: 'Lab added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.fetchMyLabs = async (req, res) => {
    try {
        const labs = await labService.fetchMyLabs(req.id);
        res.status(200).json({ status: 'success', data: labs });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchAllLabs = async (req, res) => {
    try {
        const labs = await labService.fetchAllLabs();
        res.status(200).json({ status: 'success', data: labs });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchLabsForSchool = async (req, res) => {
    const { schoolId } = req.params;
    try {
        const labs = await labService.fetchLabsForSchool(schoolId);
        res.json({ status: 'success', labs });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.updateLabData = async (req, res) => {
    const { id } = req.params;
    const { lab_name, lab_type, school_id } = req.body;
    try {
        await labService.updateLabData(req.id, id, lab_name, lab_type, school_id);
        await authService.logActivity(req.id, `User: ${req.email} updated lab data with [ID: ${id}]`);
        res.json({ status: 'success', message: 'Lab data updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.deleteLab = async (req, res) => {
    const { id } = req.params;
    try {
        await labService.deleteLab(id);
        await authService.logActivity(req.id, `User: ${req.email} deleted a lab with [ID: ${id}]`);
        res.json({ status: 'success', message: 'Lab deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};