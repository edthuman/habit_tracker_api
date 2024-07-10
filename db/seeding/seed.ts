const db = require("../index")
const format = require("pg-format")
const { dropTable, createUsersTable, createHabitsTable, createUsersHabitsTable, createLogsTable } = require("./manage-tables.ts")

exports.seed = (usersData : [{ username: string }], habitsData: any[], usersHabitsData: any[], logsData: any[]) => {
    return dropTable("logs")
    .then(() => {
        return dropTable("users_habits")
    })
    .then(() => {
        return dropTable("habits")
    })
    .then(() => {
        return dropTable("users")
    })
    .then(() => {
        return createUsersTable()
    })
    .then(() => {
        return createHabitsTable()
    })
    .then(() => {
        return createUsersHabitsTable()
    })
    .then(() => {
        return createLogsTable()
    })
    .then(() => {
        const formattedUserData = usersData.map(({ username }: any) => [ username ])
        const usersQuery = format(`
            INSERT INTO users (username)
            VALUES
            %L;`
        , formattedUserData)

        return db.query(usersQuery)
    })
    .then(() => {
        const formattedHabitData = habitsData.map(({slug, description} : any) => [ slug, description ])
        const habitsQuery = format(`
            INSERT INTO habits (slug, description)
            VALUES
            %L;`
        , formattedHabitData)

        return db.query(habitsQuery)
    })
    .catch((err: any)=>{
        console.log(err)
    })
}

export {}