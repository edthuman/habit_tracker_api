const db = require("../index")
const format = require("pg-format")

exports.dropTable = (table: string) => {
    const formattedQuery = format(`DROP TABLE IF EXISTS %I;`, table)
    return db.query(formattedQuery);
}

exports.createUsersTable = () => {
    return db.query(`
        CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL
        );
    `);
}

exports.createHabitsTable = () => {
    return db.query(`
        CREATE TABLE habits(
        habit_id SERIAL PRIMARY KEY,
        slug VARCHAR NOT NULL,
        description VARCHAR NOT NULL
        );    
    `)
}

exports.createUsersHabitsTable = () => {
    return db.query(`
        CREATE TABLE users_habits(
        user_habit_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        habit_id INT REFERENCES habits(habit_id)
        );   
    `)
}

exports.createLogsTable = () => {
    return db.query(`
        CREATE TABLE logs(
        log_id SERIAL PRIMARY KEY,
        user_habit_id INT REFERENCES users_habits(user_habit_id),
        date DATE
        );
    `)
}