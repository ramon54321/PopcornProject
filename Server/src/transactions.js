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
* Gets request by code.
* @param {string} code Request's code.
* @return {object} The request object.
*/
export function getRequest(code) {
    for (let i = 0; i < requests.length; i++) {
        if (requests[i].code === code) {
            return requests[i]
        }
    }
    return false
}

/**
* Gets all request by user
* @param {string} userid Userid
* @return {object} List of requests
*/
export function getRequestsFromUser(userid) {
    let list = []
    for (let i = 0; i < requests.length; i++) {
        if (requests[i].userid === userid) {
            list.push(requests[i])
        }
    }
    return list
}

/**
* Deletes request by code
* @param {string} code Request's code.
* @return {object} The request object.
*/
export function deleteRequest(code) {
    for (let i = 0; i < requests.length; i++) {
        if (requests[i].code === code) {
            requests.splice(i, 1)
            return true
        }
    }
    return false
}

/**
* Generates a new code.
* @return {object} The new code.
*/
function generateCode() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const codeLength = 4
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
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].code === code) {
      return false
    }
  }
  return true
}
