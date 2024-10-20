const { initDb } = require('./db');
const { addUser } = require('./db/users');
const { addCategory } = require('./db/categories');
const { addTopic } = require('./db/topics');
const { addPost } = require('./db/posts');

async function seedDatabase() {

    await initDb();

    await addUser("user1", "password1", 1);
    await addUser("admin", "password2", 2);
    await addUser("moderator", "password3", 3);

    await addCategory("Технологии", "Все о технологиях");
    await addCategory("Наука", "Общение по научным темам");

    await addTopic(1, 1, "Последние новости из мира технологий"); // user 1 создает в категории технологии
    await addTopic(2, 2, "Достижения квантовой физики"); // admin в категории наука

    await addPost(1, 1, "Как ИИ меняет нашу жизнь"); // пост в "последние новости из мира технологий" от user1
    await addPost(2, 2, "Новые изучения в квантовой физике"); // пост в "достижения квантовой физики" от admin
}

seedDatabase().then(() => {
    console.log("Database seeded successfully");
}).catch((err) => {
    console.error("Error seeding database:", err);
});
