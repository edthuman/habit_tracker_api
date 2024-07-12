const db = require("../index")

const seed = require("./seed").seed
const devData = require("../data/production-data/index")

const runSeed = () => {
    return seed(devData).then(() => db.end())
}

runSeed();

export {}