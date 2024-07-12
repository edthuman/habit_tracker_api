const usersData: [{ username: string }]= require("./users")
const habitsData: [{ slug: string, desription: string }] = require("./habits")
const usersHabitsData: [{ username: string, habit: string }] = require("./users-habits")
const logsData: [{ username: string, habit: string, date: string }] = require("./logs")

module.exports = { usersData, habitsData, usersHabitsData, logsData }

export {}