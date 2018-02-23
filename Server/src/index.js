import Blockchain from "./blockchain"
import WebServer from "./webserver"

// -- Our blockchain instance
const blockchain = new Blockchain()

// -- Our webserver - Giving it the blockchain instance so it can manipulate it
const webServer = new WebServer(blockchain)


/*  Blockchain
import Blockchain from "./blockchain"

const myChain = new Blockchain()

// -- Creating a transaction
if(from and to exist)
if(from has enough money)
return true
const myTransaction = {from: "Alex", to: "Hannah", amount: 56}
const myNewBlock = myChain.createBlock(myTransaction, myChain.getLength()-1)
myChain.addBlock(myNewBlock)
Database.saveChain(myChain)


// -- Get current user balance  [GET] /api/user/{username}/balance
const myUser = Database.getUserByName("username")
myChain.getBalance(myUser.id)

console.log(mychain.getLength())
console.log(mychain.isValid())
*/


/*  Transactions
import createRequest from "./transactions"
console.log(createRequest())
*/
