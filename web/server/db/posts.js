const { getDb } = require("./db");

const TABLE_NAME = "posts";

module.exports = {
    TABLE_NAME,

    getPostById: async (postId) => {
        return await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE post_id = ?`, postId);
    },

    deletePostById: async (postId) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE post_id = ?`, postId);
    },

    addPost: async (topicId, userId, title) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (topic_id, user_id, title) VALUES (?, ?, ?)`,
            topicId, userId, title
        );
        return { id: result.lastID, topicId, userId, title };
    },

    updatePostTitle: async (postId, title) => {
        await getDb().run(
            `UPDATE ${TABLE_NAME} SET title = ? WHERE post_id = ?`,
            title, postId
        );
    },

    getPostsByTopic: async (topicId) => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME} WHERE topic_id = ?`, topicId);
    }
};
