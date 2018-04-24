"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = popLog;

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} level log level.
 * @param {string} message message to log.
 */
function popLog(level, message) {
    switch (level.toLowerCase()) {
        case "error":
            console.log(_chalk2.default.red.bold("[ERROR] " + message));
            break;
        case "warning":
            console.log(_chalk2.default.yellow.bold("[WARNING] " + message));
            break;
        case "info":
            console.log(_chalk2.default.cyan("[INFO] " + message));
            break;
        default:
            throw Error("Unknown log level.");
    }
} /**
   * @module Logger
   */