const tagsService = require('../services/tagsService');
const authService = require('../services/authService');

exports.fetchAllTags = async (req, res) => {
    try {
        const results = await tagsService.fetchAllTags();
        return res.json({ status: "success", data: results });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Database query error" });
    }
};

exports.createTag = async (req, res) => {
    const { tag_nm } = req.body;
    const created_by = req.email; // Assuming email is stored in req after verification
    const created_at = new Date();
    try {
        const result = await tagsService.createTag(tag_nm, created_by, created_at);
        return res.json({ status: "success", data: { id: result.insertId, tag_nm } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Database insertion error" });
    }
};

exports.updateTag = async (req, res) => {
    const { id } = req.params;
    const { tagName } = req.body;
    const current_date = new Date();
    try {
        await tagsService.updateTag(id, tagName, req.email, current_date);
        await authService.logActivity(req.id, `User: ${req.email} updated a tag with [ID: ${id}] to ${tagName}`);
        return res.json({ status: "success", message: "Tag updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Failed to update tag' });
    }
};

exports.saveSearchedTag = async (req, res) => {
    const { tagId, tagName } = req.body;
    const searchedBy = req.email;
    const searchedOn = new Date();
    try {
        await tagsService.saveSearchedTag(tagId, searchedBy, searchedOn);
        await authService.logActivity(req.id, `User: ${req.email} searched for documentation with tag [${tagName}]`);
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
    }
};

exports.getTopSearchedTags = async (req, res) => {
    try {
        const results = await tagsService.getTopSearchedTags();
        return res.json({ status: 'success', data: results });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: error.message });
    }
};

exports.getCountSearches = async (req, res) => {
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based, so add 1
    const currentYear = new Date().getFullYear();
    try {
        const results = await tagsService.getCountSearches(currentMonth, currentYear);
        return res.json({ status: 'success', data: results });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: error.message });
    }
};