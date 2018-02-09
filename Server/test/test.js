const assert = require("assert")
const Blockchain = require("../dist/blockchain.js")

describe("Blockchain", function() {
	it("Should add one block to end.", function() {
		let block = Blockchain.createBlock({name: "hannu"}, -1)
		Blockchain.addBlock(block)
		assert.equal(Blockchain.getLength(), 1)
	})

	it("Should contain 3 blocks.", function() {
		let block = Blockchain.createBlock({name: "ramon"}, 0)
		Blockchain.addBlock(block)
		block = Blockchain.createBlock({name: "aelitta"}, 1)
		Blockchain.addBlock(block)
		assert.equal(Blockchain.getLength(), 3)
	})

	it("Should be valid.", function() {
		assert.equal(true, Blockchain.validate())
	})
})
