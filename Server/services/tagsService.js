const db = require('../config/db');

class TagsService {
    async fetchAllTags() {
        const query = "SELECT * FROM vw_tags";
        const [results] = await db.promise().query(query);
        return results;
    }

    async createTag(tag_nm, created_by, created_at) {
        const query = "INSERT INTO tags (tag_nm, created_by, created_at, status) VALUES (?, ?, ?, 'active')";
        const [result] = await db.promise().query(query, [tag_nm, created_by, created_at]);
        return result;
    }

    async updateTag(id, tagName, email, currentDate) {
        const query = 'UPDATE tags SET tag_nm = ?, created_by = ?, created_at = ? WHERE id = ?';
        const [result] = await db.promise().query(query, [tagName, email, currentDate, id]);
        return result;
    }

    async saveSearchedTag(tagId, searchedBy, searchedOn) {
        const query = "INSERT INTO searched_tags (tag_id, searched_by, searched_on) VALUES (?, ?, ?)";
        const [result] = await db.promise().query(query, [tagId, searchedBy, searchedOn]);
        return result;
    }

    async getTopSearchedTags() {
        const query = `
            SELECT tag_name, COUNT(*) AS search_count
            FROM vw_searched_tags
            GROUP BY tag_name
            ORDER BY search_count DESC
            LIMIT 10
        `;
        const [results] = await db.promise().query(query);
        return results;
    }

    async getCountSearches(currentMonth, currentYear) {
        const query = `
            SELECT 
                COUNT(*) AS total_searches,
                SUM(CASE WHEN MONTH(searched_on) = ? AND YEAR(searched_on) = ? THEN 1 ELSE 0 END) AS current_month_searches
            FROM vw_searched_tags
        `;
        const [results] = await db.promise().query(query, [currentMonth, currentYear]);
        return results[0];
    }
}

module.exports = new TagsService;