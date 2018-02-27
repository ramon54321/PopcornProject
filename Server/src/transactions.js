/**
 * @module Transactions
 */

let requests = []

/**
* Creates a new request object that is added to requests[].
* @param {string} userid Requester's userID.
* @param {number} amount Amount to transfer.
* @return {object} The request object.
*/
export function createRequest(userid, amount) {
  let code
  // -- Generate a new code until it's unique
  do {
    code = generateCode()
  } while (!isUnique(code))
  let request = {
    userid: userid,
    amount: amount,
    code: code,
    creationDate: Date.now(),
  }
  requests.push(request)
  return request
}

/**
* Get the request object
* @param {string} code Code for searching the object.
* @return {object} Request object.
*/
export function getRequest(code) {
  requests.map((request) => {
    if (request === code) {
      return request
    }
  })
  return null
}

/**
* Delete request object
* @param {string} code Code for the object to delete.
*/
export function deleteRequest(code) {
  requests.map((request) => {
    if (request === code) {
      requests.delete(request)
    }
  })
}

/**
* Generates a new code.
* @return {object} The new code.
*/
function generateCode() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const codeLength = 5
  let code = ""

  for (let i = 0; i < codeLength; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return code
}

/**
* Checks that the code doesn't already exists in requests[].
* @param {object} code Code to check.
* @return {boolean} True if code is unique.
*/
function isUnique(code) {
  let allValid = true
  requests.map((request) => {
    if (request === code) {
      allValid = false
    }
  })
  return allValid
}
