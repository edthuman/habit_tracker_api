const db = require("../index")
const format = require("pg-format")
const { dropTable, createUsersTable, createHabitsTable, createUsersHabitsTable, createLogsTable } = require("./manage-tables.ts")
const createRef = require("./utils").createRef

exports.seed = ({usersData, habitsData, usersHabitsData, logsData}: any) => {
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
            %L
            RETURNING *;`
        , formattedUserData)

        return db.query(usersQuery)
    })
    .then((response: any) => {
        const inputUsers = response.rows
        const usersDictionary = createRef(inputUsers, "username", "user_id")

        const formattedHabitData = habitsData.map(({slug, description} : any) => [ slug, description ])
        const habitsQuery = format(`
            INSERT INTO habits (slug, description)
            VALUES
            %L
            RETURNING *;`
        , formattedHabitData)

        return Promise.all([db.query(habitsQuery), usersDictionary])
    })
    .then(([habitsResponse, usersDictionary]: any[]) => {
        const inputHabits = habitsResponse.rows
        const habitsDictionary = createRef(inputHabits, "slug", "habit_id")
        
        const formattedUserHabitData = usersHabitsData.map((element: any)=>{
            const userID = usersDictionary[element.user]
            const habitID = habitsDictionary[element.habit]
            return [userID, habitID]
        })

        const usersHabitsQuery = format(`
            INSERT INTO users_habits (user_id, habit_id)
            VALUES 
            %L
            RETURNING *
            `, formattedUserHabitData)

        return Promise.all([db.query(usersHabitsQuery), usersDictionary, habitsDictionary])
    })
    .then(([usersHabitsResponse, usersDictionary, habitsDictionary]: any[]) => {
        const inputUsersHabits = usersHabitsResponse.rows
        const formattedLogsData = logsData.map((element: any)=>{
            const userID = usersDictionary[element.user]
            const habitID = habitsDictionary[element.habit]
            
            const userHabitObject = inputUsersHabits.find((userHabit: any)=>{
                return userHabit.user_id === userID && userHabit.habit_id === habitID;
            })

            return [
                userHabitObject.user_habit_id, 
                element.date
            ]
        })

        const logsQuery = format(`
            INSERT INTO logs (user_habit_id, date)
            VALUES
            %L
            RETURNING *;
            `, formattedLogsData)

        return db.query(logsQuery)
    })
    .catch((err: any)=>{
        console.log(err)
    })
}

export {}