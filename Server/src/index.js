import Blockchain from "./blockchain"
import WebServer from "./webserver"

// -- Our blockchain instance
const blockchain = new Blockchain()

// -- Our webserver - Giving it the blockchain instance so it can manipulate it
const webServer = new WebServer(blockchain)
