import Blockchain from "./blockchain"

let mychain = new Blockchain()

for (let i = 0; i < 500; i++) {
	let block = mychain.createBlock("hello", i-1)
	mychain.addBlock(block)
}

console.log(mychain.getLength())
console.log(mychain.isValid())
