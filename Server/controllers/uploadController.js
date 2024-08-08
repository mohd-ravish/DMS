const path = require('path');
const documentsService = require('../services/uploadService');
const authService = require('../services/authService');
const upload = require('../middlewares/docsUpload');

exports.uploadDocument = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.json({ status: 'fail', message: err.message });
        }
        const { tags, docType, description, publish } = req.body;
        const filePath = req.file.path;
        const docFormat = path.extname(req.file.originalname).slice(1);
        const ownerAuthorId = req.email;
        const docName = req.file.filename;
        const isPublished = publish === 'yes' ? 1 : 0;
        const currentDate = new Date();
        const fileSize = Math.ceil(req.file.size / 1024); // In KB
        const documentData = {
            docName, ownerAuthorId, filePath, docType, docFormat, tags, description,
            isPublished, currentDate, email: req.email, fileSize
        };

        try {
            await documentsService.uploadDocument(documentData);
            await documentsService.updateSystemSettings('total_used_space', fileSize);
            await authService.logActivity(req.id, `User: ${req.email} uploaded a new document [${docName}]`);

            return res.json({ status: 'success', message: 'Document uploaded successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    });
};

exports.addUrl = async (req, res) => {
    const { infoHead, url, tags, docType, description, publish } = req.body;
    const ownerAuthorId = req.email;
    const isPublished = publish === 'yes' ? 1 : 0;
    const currentDate = new Date();
    const assocTags = tags.join(','); // Convert tags array to a comma-separated string
    const documentData = {
        infoHead, ownerAuthorId, url, docType, assocTags, description, isPublished, currentDate, email: req.email
    };
    try {
        await documentsService.addUrl(documentData);
        await authService.logActivity(req.id, `User: ${req.email} uploaded new online document [${infoHead}]`);

        return res.json({ status: 'success', message: 'URL added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.updateDocumentMetadata = async (req, res) => {
    const { id } = req.params;
    const { tags, docType, description, publish, status } = req.body;
    const assocTags = tags.join(','); // Convert tags array to a comma-separated string
    const metadata = {
        assocTags, docType, description, status, isPublished: publish
    };
    try {
        await documentsService.updateDocumentMetadata(id, metadata);
        await authService.logActivity(req.id, `User: ${req.email} updated a document with [ID: ${id}]`);

        return res.json({ status: 'success', message: 'Document metadata updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Failed to update metadata' });
    }
};
