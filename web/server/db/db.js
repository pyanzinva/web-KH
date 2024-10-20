const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

const initDb = async () => {


    if (!db) {
        db = await open({
            filename: 'database.db',
            driver: sqlite3.Database
        });
    }

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL UNIQUE,
            userRole INTEGER NOT NULL,
            password TEXT NOT NULL,
            date TEXT NOT NULL
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
            category_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS topics (
            topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            title TEXT NOT NULL
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS posts (
            post_id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS user_roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roleName TEXT NOT NULL UNIQUE
        )`);

    await db.exec(`
        INSERT INTO user_roles (roleName)
        VALUES ("Пользователь"),
               ("Админ"),
               ("Модератор")
        ON CONFLICT(roleName) DO NOTHING;
    `);
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
};
