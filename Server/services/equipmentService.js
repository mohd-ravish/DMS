const db = require('../config/db');

class EquipmentService {
    async addEquipment(userId, equipmentName, equipmentType, equipmentQuantity) {
        const equipmentAddedOn = new Date();
        const query = `INSERT INTO equipments 
            (equipment_name, equipment_type, equipment_quantity, equipment_added_by, equipment_added_on) 
            VALUES (?, ?, ?, ?, ?)`;

        await db.promise().query(query, [equipmentName, equipmentType, equipmentQuantity, userId, equipmentAddedOn]);
    }

    async fetchMyEquipments(userId) {
        const query = "SELECT * FROM vw_equipments WHERE equipment_added_by = ? ORDER BY id DESC";
        const [results] = await db.promise().query(query, [userId]);
        return results;
    }

    async fetchAllEquipments() {
        const query = "SELECT * FROM vw_equipments ORDER BY id DESC";
        const [results] = await db.promise().query(query);
        return results;
    }

    async allocateEquipment(userId, equipmentId, schoolId, labId, allocatedQuantity) {
        const equipmentAllocatedOn = new Date();
        const query = `INSERT INTO equipments_allocation
            (equipment_id, school_id, lab_id, allocated_quantity, allocated_by, allocated_on) 
            VALUES (?, ?, ?, ?, ?, ?)`;

        await db.promise().query(query, [equipmentId, schoolId, labId, allocatedQuantity, userId, equipmentAllocatedOn]);
        await db.promise().query("UPDATE equipments SET equipment_quantity = equipment_quantity - ? WHERE id = ?", [allocatedQuantity, equipmentId]);
    }

    async updateEquipmentData(userId, equipmentId, equipmentName, equipmentType) {
        const equipmentAddedOn = new Date();
        const query = `
            UPDATE equipments
            SET equipment_name = ?, equipment_type = ?, equipment_added_by = ?, equipment_added_on = ?
            WHERE id = ?
        `;
        await db.promise().query(query, [equipmentName, equipmentType, userId, equipmentAddedOn, equipmentId]);
    }

    async deleteEquipment(equipmentId) {
        const query = `DELETE FROM equipments WHERE id = ?`;
        await db.promise().query(query, [equipmentId]);
    }
}

module.exports = new EquipmentService();
