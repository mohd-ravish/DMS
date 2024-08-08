const documentService = require('../services/artifactService');
const authService = require('../services/authService');

exports.fetchDocTypes = async (req, res) => {
    try {
        const results = await documentService.fetchDocTypes();
        res.status(200).json({ status: 'success', data: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.updateDocType = async (req, res) => {
    const { id } = req.params;
    const { docTypeName } = req.body;
    try {
        await documentService.updateDocType(id, docTypeName);
        await authService.logActivity(req.id, `User: ${req.email} updated a doc type with [ID: ${id}] to ${docTypeName}`);
        res.json({ status: "success", message: "Doc type updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: 'Database update error' });
    }
};

exports.addNewDocType = async (req, res) => {
    const { newDocTypeName } = req.body;
    try {
        const newDocTypeId = await documentService.addNewDocType(newDocTypeName);
        await authService.logActivity(req.id, `User: ${req.email} added a new doc type [${newDocTypeName}]`);
        res.json({ status: "success", message: "New Doc Type added Successfully", data: newDocTypeId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Database insertion error" });
    }
};

exports.deleteDocType = async (req, res) => {
    const { id } = req.params;
    try {
        await documentService.deleteDocType(id);
        await authService.logActivity(req.id, `User: ${req.email} deleted a doc Type [with ID: ${id}]`);
        res.status(200).json({ status: 'success', message: 'Document Type deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchMyArtifacts = async (req, res) => {
    try {
        const results = await documentService.fetchMyArtifacts(req.email);
        res.status(200).json({ status: 'success', data: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchAllArtifacts = async (req, res) => {
    try {
        const results = await documentService.fetchAllArtifacts();
        res.status(200).json({ status: 'success', data: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.deleteArtifact = async (req, res) => {
    const { id } = req.params;
    try {
        await documentService.deleteArtifact(id);
        await authService.logActivity(req.id, `User: ${req.email} deleted a document with [ID: ${id}]`);
        res.status(200).json({ status: 'success', message: 'Document deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchTopContributors = async (req, res) => {
    try {
        const results = await documentService.fetchTopContributors();
        res.json({ status: 'success', data: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.fetchCountOfArtifacts = async (req, res) => {
    try {
        const results = await documentService.fetchCountOfArtifacts();
        res.json({ status: 'success', data: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
};