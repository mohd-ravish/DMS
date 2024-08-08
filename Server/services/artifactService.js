const db = require('../config/db');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

class ArtifactsService {
    async fetchDocTypes() {
        const [results] = await db.promise().query("SELECT id, doctype_nm FROM vw_document_type");
        return results;
    };

    async updateDocType(id, docTypeName) {
        await db.promise().query('UPDATE document_type SET doctype_nm = ? WHERE id = ?', [docTypeName, id]);
    };

    async addNewDocType(newDocTypeName) {
        const [result] = await db.promise().query("INSERT INTO document_type (doctype_nm) VALUES (?)", [newDocTypeName]);
        const newDocTypeId = result.insertId;
        return newDocTypeId;
    };

    async deleteDocType(id) {
        await db.promise().query("DELETE FROM document_type WHERE id = ?", [id]);
    };

    async fetchMyArtifacts(email) {
        const [results] = await db.promise().query("SELECT * FROM vw_documents WHERE owner_author_id = ? ORDER BY id DESC", [email]);
        return results;
    };

    async fetchAllArtifacts() {
        const [results] = await db.promise().query("SELECT * FROM vw_documents ORDER BY id DESC");
        return results;
    };

    async deleteArtifact(id) {
        const [results] = await db.promise().query("SELECT doc_nm, doc_format, file_size FROM vw_documents WHERE id = ?", [id]);
        const { doc_nm: docName, doc_format: docFormat, file_size: docSize } = results[0];

        if (docFormat !== 'url') {
            const filePath = `${process.env.DOCS_UPLOADS_PATH}/${docName}`;
            await unlinkAsync(filePath);

            await db.promise().query(`
            UPDATE system_settings 
            SET value = value - ?
            WHERE variable_name = 'total_used_space'
        `, [docSize]);
        }

        await db.promise().query("DELETE FROM documents WHERE id = ?", [id]);
    };

    async fetchTopContributors() {
        const [results] = await db.promise().query(`
        SELECT owner_author_id, COUNT(*) AS doc_count
        FROM vw_documents
        GROUP BY owner_author_id
        ORDER BY doc_count DESC
        LIMIT 10
    `);
        return results;
    };

    async fetchCountOfArtifacts() {
        const [results] = await db.promise().query(`
        SELECT 
            SUM(CASE WHEN doc_format != 'url' THEN 1 ELSE 0 END) AS total_docs,
            SUM(CASE WHEN doc_format = 'url' THEN 1 ELSE 0 END) AS total_urls
        FROM vw_documents
    `);
        return results[0];
    };
}

module.exports = new ArtifactsService();