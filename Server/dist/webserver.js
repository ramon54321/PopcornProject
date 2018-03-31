"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _transactions = require("./transactions");

var Transactions = _interopRequireWildcard(_transactions);

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module WebServer
 */

let balanceSheet = {};

class WebServer {
	constructor(blockchain, database) {
		this.blockchain = blockchain;
		this.database = database;
		this.sessions = {};
		this.createBalanceSheet();

		this.app = (0, _express2.default)();
		this.app.use((0, _cookieParser2.default)());
		this.app.use((0, _bodyParser2.default)());
		this.app.use((0, _expressSession2.default)({
			secret: "thisisthesecretfortestingonly!",
			cookie: {
				maxAge: 5 * 60 * 1000
			}
		}));
		this.port = process.env.PORT | 3000;
		this.setupRoutes();
		this.startListening();
	}
	startListening() {
		console.log("[INFO][SERVER] Listening now");
		this.app.listen(this.port);
	}
	setupRoutes() {
		this.app.get("/api/", (request, response) => {
			response.send("API - Description");
		});
		this.app.post("/api/admin/initdatabase", (request, response, next) => {
			this.database.init();
			response.send(true);
		});
		this.app.get("/api/nickname/:nickname", (request, response) => {
			this.database.getPersonByNickname([request.params.nickname]).then(resp => {
				console.log(resp);
				response.send("finished");
			});
		});
		this.app.post("/api/login", (request, response, next) => {
			const nickname = request.body.nickname;
			const pass = request.body.pass;
			this.database.getPersonByNickname([nickname]).then(resp => {
				// -- Check that database query by nickname result is not empty
				if (resp.length > 0) {
					// -- Check if the nickname and password is correct
					if (nickname === resp[0].nickname && pass === resp[0].pass) {
						// -- Link session with user
						this.linkSessionWithUser(request, resp[0].id);
						response.send(true);
					}
				}
				// -- If the nickname or password was wrong
				// -- Stop execution of this route
				response.send(false);
				return;
			});
		});
		this.app.post("/api/logout", (request, response, next) => {
			delete request.session.userid;
			response.send(true);
		});
		this.app.all(/\/api\/*/, (request, response, next) => {
			// -- If userid not found in session stop execution of this route
			if (!request.session.userid) {
				response.send(false);
				return;
			}
			// -- Userid found in session so continue to secure page
			next();
		});

		/*
  // User creates a request to get specific amount of coins.
  // User gets the uniq code when the request is done
  this.app.post("/api/transaction/receive", (request, response) => {
  	// params: 1.senderId, amountOfcoins
  	// get: code
  })
  		// User typed the code to get the information of the request
  this.app.get("/api/transaction/send", (request, response) => {
  	// params: code
  	// get: 1.receiverId 2. amountOfCoins
  })
  		// User confirm the request to send specific
  // amount of coinc to a specific person
  this.app.post("/api/transaction/confirm", (request, response) => {
  	// params: 1:senderId 2. receiverId, 3. code
  })
  		*/

		this.app.get("/api/transaction/:code", (request, response) => {
			const code = request.params.code;
			console.log("[INFO][ROUTE] Got parameter: " + code);
			const req = Transactions.getRequest(code);
			console.log(req);
			response.send(req);
		});

		this.app.post("/api/transactionrequest/:amount", (request, response) => {
			const userid = request.session.userid;
			const amount = request.params.amount;
			const requestCode = this.createTransactionRequest(userid, amount);
			response.send("Request created! Code: " + requestCode);
		});

		// Get balance of the current user
		this.app.get("/api/balance", (request, response) => {
			const balance = this.getBalanceById(request.session.userid);
			response.send("Your balance is: " + balance);
		});
	}

	// -- Route functions

	/**
  * Links the created session with the user in the request body. The session
  * userid can then be used to look up details with respect to the active
  * user from a database for example.
  *
  * The user can have multiple sessions open because all sessions will point
  * to the same userid, meaning all actions will be taken on the same
  * instance of the user, irrespective from which session the changes are
  * made.
  * @param {object} request Request object containing the session to which
  * the userid will be added.
  * @param {number} userid The userid to add to the session.
  */
	linkSessionWithUser(request, userid) {
		request.session.userid = userid;
	}

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

	/**
 * Creates balance sheet
 */
	createBalanceSheet() {
		console.log("[INFO][SERVER] Creating balance scheet");
		// -- Set every persons balance to 0
		this.database.getPersonAll().then(resp => {
			for (let i = 0; resp[i] != null; i++) {
				const userid = resp[i].id;
				balanceSheet[userid] = { amount: 0 };
			}
			// -- Go through every block's transaction and update balances accordingly
			this.database.getBlockAll().then(resp => {
				for (let i = 0; resp[i] != null; i++) {
					const from = resp[i].body.from;
					const to = resp[i].body.to;
					const amount = resp[i].body.amount;
					this.updateBalanceSheet(from, to, amount);
				}
			});
		});
	}
	/**
 * Updates balance sheet
 * @param {object} from Sender
 * @param {object} to Receiver
 * @param {object} amount
 */
	updateBalanceSheet(from, to, amount) {
		// -- Update sender's balance
		if (from in balanceSheet) {
			balanceSheet[from] = { amount: balanceSheet[from].amount - amount };
		}
		// -- Update receiver's balanceSheet
		if (to in balanceSheet) {
			balanceSheet[to] = { amount: balanceSheet[to].amount + amount };
		}
	}
	/**
 * Get user's balance by id
 * @param {object} id User's id
 * @return {object} User's balance
 */
	getBalanceById(id) {
		if (id in balanceSheet) {
			return balanceSheet[id].amount;
		}
		return false;
	}
}
exports.default = WebServer;