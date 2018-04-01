/**
 * @module Blockchain
 */

import * as Crypto from "crypto"

export default class Blockchain {
  constructor() {
    this.publicKey = "popcornblockchain"
    this.blockchain = []
  }

  /**
  * Inserts blocks fetched from database to blockchain array.
  * @param {object} blocks All block's
  */
  loadBlockchain(blocks) {
      console.log("[INFO][BLOCKCHAIN] Initializing blockchain")
      for (let i = 0; blocks[i] != null; i++) {
          // Assigning to different variable because database has different name
          blocks[i].previousHash = blocks[i].previous_hash
          this.addBlock(blocks[i])
      }
  }

  /**
  * Gets the length of the blockchain.
  * @return {number} The length of the blockchain.
  */
  getLength() {
    return this.blockchain.length
  }

  /**
  * Creates a new block.
  * @param {object} data The block data.
  * @param {number} previousBlockIndex The index of the previous
  * block in the blockchain.
  * @return {object} The new block.
  */
  createBlock(data, previousBlockIndex) {
    let previousHash = previousBlockIndex == -1
      ? 0
      : this.blockchain[previousBlockIndex].hash

    // -- Create initial block
    let block = {
      previousHash: previousHash,
      data: data,
      nonce: 0,
      hash: "",
    }

    // -- Compute the hash with nonce until difficulty is met
    while (!block.hash.startsWith("00000")) {
      block.nonce++
      block.hash = this.hashBlock(block)
    }

    return block
  }

  /**
  * Adds a block to the blockchain.
  * @param {object} block The block to add.
  * @return {boolean} True if the block was successfully added.
  */
  addBlock(block) {
    if (!block) {
      return false
    }

    // -- If blockchain is NOT empty AND previousHash is not correct
    if (this.blockchain.length > 0 &&
    block.previousHash !== this.blockchain[this.blockchain.length-1].hash) {
        console.log("[INFO][BLOCKCHAIN] Previous hash was not correct")
        return false
    }

    this.blockchain.push(block)
    return true
  }

  /**
  * Validate the entire blockchain. This function will iterate the chain, one
  * block at a time, checking that the block contains the same hash as the
  * previous block's hash, and that the hash of the current block is indeed
  * correct.
  * @return {boolean} True if the blockchain is valid in its entirity.
  */
  isValid() {
    // -- If there is 1 or less entries in chain, assume it is valid
    if (this.blockchain.length < 2) {
      return true
    }

    // -- Iterate chain and check for errors
    for (let i = 1; i < this.blockchain.length; i++) {
      // -- Check if previous hash is wrong
      if (this.blockchain[i].previousHash !== this.blockchain[i-1].hash) {
        return false
      }

      // -- Check if hash itself is wrong
      if (this.hashBlock(this.blockchain[i]) !== this.blockchain[i].hash) {
        return false
      }
    }

    // -- No errors found at this point
    return true
  }

  /**
  * Hashes the block.
  * @param {object} block The block to hash.
  * @return {string} The hash in hex form.
  */
  hashBlock(block) {
    return this.hashData({previousHash: block.previousHash, data: block.data,
      nonce: block.nonce})
  }

  /**
  * Hashes the data with the set blockchain public key.
  * @param {object} data The data to hash.
  * @return {string} The hash in hex form.
  */
  hashData(data) {
    return Crypto.createHmac("sha256", this.publicKey)
    .update(JSON.stringify(data))
    .digest("hex")
  }
}
