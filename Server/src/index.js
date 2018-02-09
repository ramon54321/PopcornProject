import * as Blockchain from "./blockchain"

let block = Blockchain.createBlock({name: "hannu"}, -1)
Blockchain.addBlock(block)

console.log(Blockchain.blockchain.length)
