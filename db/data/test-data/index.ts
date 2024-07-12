const usersData: [{ username: string }] = require("./users")
const habitsData: [{ slug: string, description: string }] = require("./habits")
const usersHabitsData: [{ user: string, habit: string }] = require("./users-habits")
const logsData: [{ username: string, habit: string, date: string }] = require("./logs")

module.exports = { usersData, habitsData, usersHabitsData, logsData }

export {}