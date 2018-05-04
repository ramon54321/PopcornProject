"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require("pg");

var _fs = require("fs");

var _logger = require("./logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Database {
    constructor() {
        (0, _logger2.default)("info", "Loading environment variables where ENV_NAME = " + process.env.ENV_NAME);

        this.client = new _pg.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        this.connect();
    }

    async connect() {
        (0, _logger2.default)("info", "[Database] Trying to connect to database");
        await this.client.connect();
        (0, _logger2.default)("info", "[Database] Successfully connected to database");
    }

    async runQuery(filename, params = "") {
        const query = (0, _fs.readFileSync)(filename, { encoding: "UTF8" }).trim();
        const res = await this.client.query(query, params);
        return res.rows;
    }

    // -- Admin
    init() {
        (0, _logger2.default)("info", "[Database] Initializing database");
        this.runQuery("./src/queries/init.sql");
    }

    // -- Person table
    getPersonAll() {
        return this.runQuery("./src/queries/person_select_all.sql");
    }
    getPersonById(params) {
        return this.runQuery("./src/queries/person_select_by_id.sql", params);
    }
    getPersonByNickname(params) {
        return this.runQuery("./src/queries/person_select_by_nickname.sql", params);
    }
    createPerson(params) {
        return this.runQuery("./src/queries/person_create.sql", params);
    }

    // -- Blockchain table
    getBlockAll() {
        return this.runQuery("./src/queries/block_select_all.sql");
    }
    createBlock(params) {
        // MAKE SURE PREHASH MATCHES
        return this.runQuery("./src/queries/block_create.sql", params);
    }
}
exports.default = Database; /**
                             * @module Database
                             */