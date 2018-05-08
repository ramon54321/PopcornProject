import dotenv from "dotenv"
import Blockchain from "./blockchain"
import Database from "./database"
import WebServer from "./webserver"

/**
    Import dotenv to load environment variables from .env in the
    root server folder.
    The log is to see if the hello world appears, meaning the
    environment variables are loaded correctly.
    This is very useful when the application gets deployed, to see if
    the variables loaded correctly.
*/
dotenv.config()

// -- Our blockchain instance
const blockchain = new Blockchain()

// -- Our database handle
const database = new Database()

// -- Our webserver - Giving it the blockchain instance so it can manipulate it
const webServer = new WebServer(blockchain, database)
