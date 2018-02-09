"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockchain = undefined;
exports.createBlock = createBlock;
exports.addBlock = addBlock;

var _crypto = require("crypto");

var Crypto = _interopRequireWildcard(_crypto);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let publicKey = "popcornblockchain"; /**
                                      * @module Blockchain
                                      */

let blockchain = exports.blockchain = [];

/**
* Creates a new block.
* @param {object} data The block data.
* @param {number} previousBlockIndex The index of the previous
* block in the blockchain.
* @return {object} The new block.
*/
function createBlock(data, previousBlockIndex) {
  let previousHash = previousBlockIndex == -1 ? 0 : blockchain[previousBlockIndex].hash;
  let hash = hashData(data);

  let block = {
    previousHash: previousHash,
    data: data,
    hash: hash
  };

  return block;
}

/**
* Adds a block to the blockchain.
* @param {object} block The block to add.
* @return {boolean} True if the block was successfully added.
*/
function addBlock(block) {
  if (!block) {
    return false;
  }

  blockchain.push(block);
  return true;
}

/**
* Hashes the data with the set blockchain public key.
* @param {object} data The data to hash.
* @return {string} The hash in hex form.
*/
function hashData(data) {
  return Crypto.createHmac("sha256", publicKey).update(data).digest("hex");
}