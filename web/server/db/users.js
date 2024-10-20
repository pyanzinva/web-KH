const md5 = require('md5');
const { getDb } = require("./db");

const TABLE_NAME = "users";

module.exports = {
    TABLE_NAME,

    addUser: async (login, password, userRole = 1) => {
        const hashedPassword = md5(password);
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (login, password, userRole, date) VALUES (?, ?, ?, ?)`,
            login, hashedPassword, userRole, new Date().toISOString()
        );
        return { id: result.lastID, login, userRole };
    },

    getUsers: async () => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME}`);
    },

    getUserByLogin: async (login) => {
        return await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE login = ?`, login);
    },

    getUserById: async (id) => {
        return await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE user_id = ?`, id);
    },

    getUsersByRole: async (userRole) => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME} WHERE userRole = ?`, userRole);
    },

    checkPassword: async (login, password) => {
        const user = await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE login = ?`, login);
        if (!user) return null;
        const hashedPassword = md5(password);
        return hashedPassword === user.password ? user : null;
    }
};
