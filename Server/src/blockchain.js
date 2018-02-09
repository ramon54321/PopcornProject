/**
 * @module Blockchain
 */

import * as Crypto from "crypto"

let publicKey = "popcornblockchain"
let blockchain = []

/**
* Gets the length of the blockchain.
* @return {number} The length of the blockchain.
*/
export function getLength() {
	return blockchain.length
}

/**
* Validates the entire blockchain. This function will iterate the chain, one
* block at a time, checking that the block contains the same hash as the
* previous block's hash, and that the hash of the current block is indeed
* correct.
* @return {boolean} True if the blockchain is valid in its entirity.
*/
export function validate() {
	// -- If there is 1 or less entries in chain, assume it is valid
	if (blockchain.length < 2) {
		return true
	}

	// -- Iterate chain and check for errors
	for (let i = 1; i < blockchain.length; i++) {
		// -- Check if previous hash is wrong
		if (blockchain[i].previousHash !== blockchain[i-1].hash) {
			return false
		}

		// -- Check if hash itself is wrong
		let hash = hashData({previousHash: blockchain[i].previousHash,
			data: blockchain[i].data})
		if (hash !== blockchain[i].hash) {
			return false
		}
	}

	// -- No errors found at this point
	return true
}

/**
* Creates a new block.
* @param {object} data The block data.
* @param {number} previousBlockIndex The index of the previous
* block in the blockchain.
* @return {object} The new block.
*/
export function createBlock(data, previousBlockIndex) {
	let previousHash = previousBlockIndex == -1 ? 0 :
	blockchain[previousBlockIndex].hash
	let hash = hashData({previousHash: previousHash, data: data})

	let block = {
		previousHash: previousHash,
		data: data,
		hash: hash,
	}

	return block
}

/**
* Adds a block to the blockchain.
* @param {object} block The block to add.
* @return {boolean} True if the block was successfully added.
*/
export function addBlock(block) {
	if (!block) {
	return false
	}

	blockchain.push(block)
	return true
}

/**
* Hashes the data with the set blockchain public key.
* @param {object} data The data to hash.
* @return {string} The hash in hex form.
*/
function hashData(data) {
	return Crypto.createHmac("sha256", publicKey)
	.update(JSON.stringify(data))
	.digest("hex")
}
