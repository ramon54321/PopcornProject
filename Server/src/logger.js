/**
 * @module Logger
 */

import chalk from "chalk"

/**
 * @param {string} level log level.
 * @param {string} message message to log.
 */
export default function popLog(level, message) {
    switch (level.toLowerCase()) {
        case "error":
            console.log(chalk.red.bold("[ERROR] " + message))
            break
        case "warning":
            console.log(chalk.yellow.bold("[WARNING] " + message))
            break
        case "info":
            console.log(chalk.cyan("[INFO] " + message))
            break
        default:
            throw Error("Unknown log level.")
    }
}
