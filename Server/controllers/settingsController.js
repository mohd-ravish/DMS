const settingsService = require('../services/settingsService');
const authService = require('../services/authService');

exports.fetchFileUploadLimit = async (req, res) => {
    try {
        const settings = await settingsService.fetchFileUploadLimit();
        if (settings) {
            res.json({
                status: "success",
                data: {
                    limit: settings.value,
                    updatedBy: settings.updated_by,
                    lastUpdated: settings.last_updated_on,
                    allowedToChange: settings.allowed_to_change,
                },
            });
        } else {
            res.json({ status: "error", message: "No settings found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Database query error" });
    }
};

exports.updateFileUploadLimit = async (req, res) => {
    const { newLimit } = req.body;
    try {
        await settingsService.updateFileUploadLimit(newLimit, req.email);
        await authService.logActivity(req.id, `User: ${req.email} updated upload limit to ${newLimit} KB`);
        res.json({ status: "success", message: "Upload Limit updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Database update error" });
    }
};

exports.fetchAllocatedUsedSpace = async (req, res) => {
    try {
        const results = await settingsService.fetchAllocatedUsedSpace();
        const data = {};
        results.forEach(row => {
            data[row.variable_name] = {
                value: row.value,
                last_updated_on: row.last_updated_on,
                updated_by: row.updated_by
            };
        });

        if (Object.keys(data).length > 0) {
            res.json({ status: "success", data });
        } else {
            res.status(404).json({ status: "error", message: "No settings found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Database query error" });
    }
};

exports.updateAllocatedSpace = async (req, res) => {
    const { newAllocateSpace } = req.body;
    const newAllocateSpaceInKB = newAllocateSpace * 1024 * 1024;
    try {
        await settingsService.updateAllocatedSpace(newAllocateSpaceInKB, req.email);
        await authService.logActivity(req.id, `User: ${req.email} updated total allocated space to ${newAllocateSpace} GB`);
        res.json({ status: "success", message: "New space allocated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Database update error" });
    }
};

exports.fetchDocFormats = async (req, res) => {
    try {
        const results = await settingsService.fetchDocFormats();
        if (results.length === 0) {
            return res.json({ status: 'fail', message: 'No document formats found' });
        }
        const formatsString = results.value;
        const formatsArray = formatsString.split(',').map(format => {
            const [formatName, controlId] = format.split(':');
            return { formatName, controlId: parseInt(controlId) };
        });
        res.json({ status: 'success', data: formatsArray });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: 'Database query error' });
    }
};

exports.updateDocFormatControl = async (req, res) => {
    const { formatName, controlId } = req.body;
    try {
        const results = await settingsService.fetchDocFormats();
        if (results.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'Document formats not found' });
        }
        const formatsString = results.value;
        const formatsArray = formatsString.split(',').map(format => {
            const [name, id] = format.split(':');
            return { name, id: parseInt(id) };
        });
        const updatedFormatsArray = formatsArray.map(format => {
            if (format.name === formatName) {
                format.id = controlId;
            }
            return format;
        });
        const updatedFormatsString = updatedFormatsArray.map(format => `${format.name}:${format.id}`).join(',');
        await settingsService.updateDocFormatControl(updatedFormatsString, req.email);
        await authService.logActivity(req.id, `User: ${req.email} updated doc formats`);
        res.json({ status: 'success', message: 'Document format updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: 'Database update error' });
    }
};