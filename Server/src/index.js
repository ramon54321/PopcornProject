import Blockchain from "./blockchain"

let mychain = new Blockchain()


let myTransaction = {from: "Alex", to: "Hannah", amount: 56}

for (let i = 0; i < 10; i++) {
	let block = mychain.createBlock(myTransaction, i-1)
	mychain.addBlock(block)
}

console.log(mychain.getLength())
console.log(mychain.isValid())
