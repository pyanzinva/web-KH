const { getDb } = require("./db");

const TABLE_NAME = "categories";

module.exports = {
    TABLE_NAME,
    getCategoryById: async (categoryId) => {
        const result = await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE category_id = ?`, categoryId);
        return result;
    },

    deleteCategoryById: async (categoryId) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE category_id = ?`, categoryId);
    },

    addCategory: async (name, description) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (name, description, token) VALUES (?, ?, ?)`,
            name, description
        );
        return { id: result.lastID, name, description };
    },

    updateCategory: async (categoryId, name, description) => {
        await getDb().run(
            `UPDATE ${TABLE_NAME} SET name = ?, description = ? WHERE category_id = ?`,
            name, description, categoryId
        );
    },

    getAllCategories: async () => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME}`);
    }
};
