const sessionService = require('../services/sessionService');
const authService = require('../services/authService');
const { upload, updateUpload } = require('../middlewares/studentListUpload');

exports.setupSession = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'fail', message: 'Failed to upload file' });
        }
        const { sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId } = req.body;
        try {
            const sessionId = await sessionService.setupSession(req.id, sessionTitle, sessionHost, sessionDate, sessionTime, schoolId, labId, req.folderName);
            await authService.logActivity(req.id, `User: ${req.email} setup a new session [${sessionTitle}] on [${sessionDate}]`);
            res.json({ status: 'success', message: 'Session setup successful', sessionId });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    });
};

exports.fetchMySessions = async (req, res) => {
    try {
        const sessions = await sessionService.fetchMySessions(req.id);
        res.status(200).json({ status: 'success', data: sessions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

exports.fetchAllSessions = async (req, res) => {
    try {
        const sessions = await sessionService.fetchAllSessions();
        res.status(200).json({ status: 'success', data: sessions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

exports.updateSessionData = async (req, res) => {
    const { id } = req.params;
    const { session_title, session_host, session_date, session_time, school_id, lab_id, session_status } = req.body;
    try {
        await sessionService.updateSessionData(req.id, id, session_title, session_host, session_date, session_time, school_id, lab_id, session_status);
        await authService.logActivity(req.id, `User: ${req.email} updated session data with [ID: ${id}]`);
        res.json({ status: 'success', message: 'Session data updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deleteSession = async (req, res) => {
    const { id } = req.params;
    try {
        await sessionService.deleteSession(id);
        await authService.logActivity(req.id, `User: ${req.email} deleted a session with [ID: ${id}]`);
        res.json({ status: 'success', message: 'Session deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

exports.getStudentList = async (req, res) => {
    const { sessionFolderName } = req.params;
    try {
        const fileData = await sessionService.getStudentList(sessionFolderName);
        res.setHeader('Content-Disposition', 'attachment; filename=attendees.xlsx');
        res.setHeader('Content-Type', 'application/vnd.ms-excel');
        res.send(fileData);
    } catch (error) {
        console.log(error);
        res.status(404).send('File not found.');
    }
};

exports.saveStudentsList = async (req, res) => {
    updateUpload.single('file')(req, res, async (err) => {
        if (err) {
            return res.json({ status: 'fail', message: err.message });
        }

        const { sessionFolderName } = req.params;
        const { presentCount } = req.body;
        try {
            await sessionService.saveStudentsList(req.file.path, sessionFolderName, presentCount);
            res.send('File updated successfully.');
        } catch (error) {
            console.log(error);
            res.status(500).send('Failed to update the file');
        }
    });
};