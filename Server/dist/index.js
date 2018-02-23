"use strict";

var _webserver = require("./webserver");

var _webserver2 = _interopRequireDefault(_webserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const webServer = new _webserver2.default();

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