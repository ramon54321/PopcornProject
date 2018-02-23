"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRequest = createRequest;
/**
 * @module Transactions
 */

let requests = [];

/**
* Creates a new request object that is added to requests[].
* @param {string} userid Requester's userID.
* @param {number} amount Amount to transfer.
* @return {object} The request object.
*/
function createRequest(userid, amount) {
  let code;
  // -- Generate a new code until it's unique
  do {
    code = generateCode();
  } while (!isUnique(code));
  let request = {
    userid: userid,
    amount: amount,
    code: code,
    creationDate: Date.now()
  };
  requests.push(request);
  return request;
}

/**
* Generates a new code.
* @return {object} The new code.
*/
function generateCode() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const codeLength = 5;
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

/**
* Checks that the code doesn't already exists in requests[].
* @param {object} code Code to check.
* @return {boolean} True if code is unique.
*/
function isUnique(code) {
  for (let i = 0; i < requests.length; i++) {
    if (requests[i] === code) {
      return false;
    }
  }
  return true;
}