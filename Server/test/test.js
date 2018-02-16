import assert from "assert"
import Blockchain from "../src/blockchain"

let blockchain = new Blockchain()
describe("Blockchain", function() {
	it("Should add one block to end.", function() {
		let block = blockchain.createBlock({name: "hannu"}, -1)
		blockchain.addBlock(block)
		assert.equal(blockchain.getLength(), 1)
	})

	it("Should contain 3 blocks.", function() {
		let block = blockchain.createBlock({name: "ramon"}, 0)
		blockchain.addBlock(block)
		block = blockchain.createBlock({name: "aelitta"}, 1)
		blockchain.addBlock(block)
		assert.equal(blockchain.getLength(), 3)
	})

	it("Should be valid.", function() {
		assert.equal(true, blockchain.isValid())
	})

	it("Should return false when trying to add invalid block.", function() {
		let block = blockchain.createBlock({name: "broken"}, 1)
		let didAdd = blockchain.addBlock(block)
		assert.equal(didAdd, false)
	})
})
