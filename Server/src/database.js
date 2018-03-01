/**
 * @module Database
 */

export default class Database {
    constructor() {
        console.log("[INFO] Loading environment variables where ENV_NAME = "
        + process.env.ENV_NAME)
    }
    getUserById(id) {}
    getUserByNickname(nickname) {}
    createUser(nickname, password) {}

    getBlockById(id) {}
    getBlockByHash(hash) {}
    getBlocksAll() {}
    createBlock(previousHash, data, nonce, hash) {} // MAKE SURE PREHASH MATCHES
}
