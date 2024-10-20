const { getDb } = require("./db");

const TABLE_NAME = "topics";

module.exports = {
    TABLE_NAME,
    
    getTopicById: async (topicId) => {
        return await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE topic_id = ?`, topicId);
    },

    deleteTopicById: async (topicId) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE topic_id = ?`, topicId);
    },

    addTopic: async (userId, categoryId, title) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (user_id, category_id, title) VALUES (?, ?, ?)`,
            userId, categoryId, title
        );
        return { id: result.lastID, userId, categoryId, title };
    },

    updateTopic: async (topicId, title) => {
        await getDb().run(
            `UPDATE ${TABLE_NAME} SET title = ? WHERE topic_id = ?`,
            title, topicId
        );
    },

    getTopicsByCategory: async (categoryId) => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME} WHERE category_id = ?`, categoryId);
    }
};
