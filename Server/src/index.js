import * as Blockchain from "./blockchain"

let block = Blockchain.createBlock({name: "hannu"}, -1)
Blockchain.addBlock(block)
block = Blockchain.createBlock({name: "ramon"}, 0)
Blockchain.addBlock(block)
block = Blockchain.createBlock({name: "aelitta"}, 1)
Blockchain.addBlock(block)
block = Blockchain.createBlock({name: "bob"}, 2)
Blockchain.addBlock(block)

console.log(Blockchain.blockchain)
