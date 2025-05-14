const pino = require("pino")

const logger = pino({
    level: 'info',
    base: undefined,
    timestamp: pino.stdTimeFunctions.isoTime
})

module.exports = logger