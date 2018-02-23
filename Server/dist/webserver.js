"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _transactions = require("./transactions");

var Transactions = _interopRequireWildcard(_transactions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module WebServer
 */

class WebServer {
	constructor(blockchain) {
		this.blockchain = blockchain;
		this.app = (0, _express2.default)();
		this.port = process.env.PORT | 3000;
		this.setupRoutes();
		this.startListening();
	}
	setupRoutes() {
		this.app.get("/api/", (request, response) => {
			response.send("API - Description");
		});
	}
	startListening() {
		this.app.listen(this.port);
	}

	// -- Route functions
	/**
  * Creates a transaction request, which can be retrieved using the returned
  * code. The transaction request also stores the time of creation, and is
  * valid for a set period of time. Be sure to create a transaction request
  * only when the confirmation of the transaction is expected soon.
  * @param {number} userid The id of the user requesting the transaction.
  * @param {number} amount The amount of currency to transfer in the
  * transaction.
  * @return {string} A random code which can be used to reference to this
  * transaction request.
  */
	createTransactionRequest(userid, amount) {
		let request = Transactions.createRequest(userid, amount);
		return request.code;
	}

	/**
  * Confirms the requested transaction by locking it into the blockchain. The
  * transaction request is also deleted.
  * @param {string} code The code received when creating the transaction
  * request.
  * @return {boolean} True if the transaction was added to the blockchain
  * pool. False if there was an error in adding the request, commonly caused
  * by the request with the given code not being present in the transaction
  * requests array. Ensure the code was first created with
  * 'createTransactionRequest'. The request code will only be deleted if the
  * returned value is true.
  */
	confirmTransaction(code) {
		// -- Get transaction request with the given code - else return false
		let request = Transactions.getRequest(code);
		if (!request) {
			return false;
		}

		// -- Create transaction data
		let data = {}
		// some transaction data here


		// -- Create and add block to blockchain
		;let block = this.blockchain.createBlock(data, this.blockchain.getLength() - 1);
		let successfullyAdded = this.blockchain.addBlock(block);
		if (!successfullyAdded) {
			return false;
		}

		// -- Delete transaction request
		Transactions.deleteRequest(code);

		return true;
	}
}
exports.default = WebServer;