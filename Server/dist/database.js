"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Database {
    constructor() {
        /**
            Import dotenv to load environment variables from .env in the
            root server folder.
            The log is to see if the hello world appears, meaning the
            environment variables are loaded correctly.
            This is very useful when the application gets deployed, to see if
            the variables loaded correctly.
        */
        _dotenv2.default.config();

        console.log("[INFO] Loading environment variables where ENV_HW = " + process.env.ENV_NAME);
    }
}
exports.default = Database; /**
                             * @module Database
                             */