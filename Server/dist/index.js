"use strict";

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _blockchain = require("./blockchain");

var _blockchain2 = _interopRequireDefault(_blockchain);

var _database = require("./database");

var _database2 = _interopRequireDefault(_database);

var _webserver = require("./webserver");

var _webserver2 = _interopRequireDefault(_webserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
    Import dotenv to load environment variables from .env in the
    root server folder.
    The log is to see if the hello world appears, meaning the
    environment variables are loaded correctly.
    This is very useful when the application gets deployed, to see if
    the variables loaded correctly.
*/
_dotenv2.default.config();

// -- Our blockchain instance
const blockchain = new _blockchain2.default();

// -- Our database handle
const database = new _database2.default();

// -- Our webserver - Giving it the blockchain instance so it can manipulate it
const webServer = new _webserver2.default(blockchain, database);