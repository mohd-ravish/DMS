const db = require('../config/db');

class UploadService {
    async uploadDocument(documentData) {
        const { docName, ownerAuthorId, filePath, docType, docFormat, tags, description, isPublished, currentDate, email, fileSize } = documentData;
        const query = `INSERT INTO documents 
                       (doc_nm, owner_author_id, doc_path, doc_type, doc_format, assoc_tags, doc_description, doc_status, is_published, date_uploaded, uploaded_by, file_size) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.promise().query(query, [docName, ownerAuthorId, filePath, docType, docFormat, tags, description, 'active', isPublished, currentDate, email, fileSize]);
        return result;
    }

    async addUrl(documentData) {
        const { infoHead, ownerAuthorId, url, docType, assocTags, description, isPublished, currentDate, email } = documentData;
        const query = `INSERT INTO documents 
                       (doc_nm, owner_author_id, doc_path, doc_type, doc_format, assoc_tags, doc_description, doc_status, is_published, date_uploaded, uploaded_by) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.promise().query(query, [infoHead, ownerAuthorId, url, docType, 'url', assocTags, description, 'active', isPublished, currentDate, email]);
        return result;
    }

    async updateDocumentMetadata(id, metadata) {
        const { assocTags, docType, description, status, isPublished } = metadata;
        const query = 'UPDATE documents SET assoc_tags = ?, doc_type = ?, doc_description = ?, doc_status = ?, is_published = ? WHERE id = ?';
        const [result] = await db.promise().query(query, [assocTags, docType, description, status, isPublished, id]);
        return result;
    }

    async updateSystemSettings(variableName, incrementValue) {
        const query = "UPDATE system_settings SET value = value + ? WHERE variable_name = ?";
        const [result] = await db.promise().query(query, [incrementValue, variableName]);
        return result;
    }
}

module.exports = new UploadService;
