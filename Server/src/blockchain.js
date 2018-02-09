/**
 * @module Blockchain
 */

import * as Crypto from "crypto"

let publicKey = "popcornblockchain"
export let blockchain = []

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
  let hash = hashData(data)

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
                   .update(data)
                   .digest("hex")
}
