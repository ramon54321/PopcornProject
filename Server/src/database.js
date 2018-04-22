/**
 * @module Database
 */

import {Client} from "pg"
import {readFileSync} from "fs"

export default class Database {
    constructor() {
        console.log("[INFO] Loading environment variables where ENV_NAME = "
        + process.env.ENV_NAME)

        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        })

        this.connect()
    }

    async connect() {
        console.log("[INFO][Database] Trying to connect to database")
        await this.client.connect()
        console.log("[INFO][Database] Successfully connected to database")
    }

    async runQuery(filename, params = "") {
        const query = readFileSync(filename, {encoding: "UTF8"}).trim()
        const res = await this.client.query(query, params)
		return res.rows
    }

    // -- Admin
    init() {
        console.log("[ADMIN][Database] Initializing database")
        this.runQuery("./src/queries/init.sql")
    }

    // -- Person table
    getPersonAll() {
        return this.runQuery("./src/queries/person_select_all.sql")
    }
    getPersonById(params) {
        return this.runQuery("./src/queries/person_select_by_id.sql",
        params)
    }
    getPersonByNickname(params) {
        return this.runQuery("./src/queries/person_select_by_nickname.sql",
        params)
    }
    createPerson(params) {
        return this.runQuery("./src/queries/person_create.sql", params)
    }

    // -- Blockchain table
    getBlockAll() {
        return this.runQuery("./src/queries/block_select_all.sql")
    }
    createBlock(params) { // MAKE SURE PREHASH MATCHES
        return this.runQuery("./src/queries/block_create.sql", params)
    }
}
