"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require("pg");

var _fs = require("fs");

/**
 * @module Database
 */

class Database {
    constructor() {
        console.log("[INFO] Loading environment variables where ENV_NAME = " + process.env.ENV_NAME);

        this.client = new _pg.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        this.connect();
    }

    async connect() {
        console.log("[INFO][Database] Trying to connect to database");
        await this.client.connect();
        console.log("[INFO][Database] Successfully connected to database");
    }

    // -- Admin
    init() {
        console.log("[ADMIN][Database] Initializing database");
        this.runQuery("./src/queries/init.sql");
        // this.runQuery("./src/queries/person_select_all.sql")
    }

    async runQuery(filename) {
        const query = (0, _fs.readFileSync)(filename, { encoding: "UTF8" }).substring(1);
        const res = await this.client.query(query);
        return res.rows;
    }

    // -- User table
    getUserById(id) {}
    getUserByNickname(nickname) {}
    createUser(nickname, password) {}

    // -- Blockchain table
    getBlockById(id) {}
    getBlockByHash(hash) {}
    getBlocksAll() {}
    createBlock(previousHash, data, nonce, hash) {} // MAKE SURE PREHASH MATCHES
}
exports.default = Database;