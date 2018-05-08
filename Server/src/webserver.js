/**
 * @module WebServer
 */

import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import session from "express-session"
import * as Transactions from "./transactions"
import popLog from "./logger.js"

let balanceSheet = {}

export default class WebServer {
	constructor(blockchain, database) {
		this.blockchain = blockchain
		this.database = database
		this.sessions = {}
		this.createBalanceSheet()
		this.initializeBlockchain()

		this.app = express()
		this.app.use(cookieParser())
		this.app.use(bodyParser())
		this.app.use(session({
			secret: "thisisthesecretfortestingonly!",
			cookie: {
				maxAge: 5 * 60 * 1000,
			},
		}))
		this.port = process.env.PORT || 3000
		this.setupRoutes()
		this.startListening()
	}
	startListening() {
		popLog("info", "[SERVER] Listening now")
		this.app.listen(this.port, "0.0.0.0")
	}
	setupRoutes() {
		// API description
		this.app.get("/api/", (request, response) => {
			this.getCirculationBalance()
			response.send("API - Description")
		})

		// Initialize database. Note that after database initialization the server
		// needs to be restarted for in-memory data such as balance scheet
		// and blockchain to instantiate correctly.
		this.app.post("/api/admin/initdatabase", (request, response, next) => {
			this.database.init()
			response.send({success: true})
		})

		// Get current coin value
		this.app.get("/api/value", (request, response) => {
			const value = this.getCalculatedValue()
			response.send({success: true, value: value})
		})

		// Register new customer
		this.app.post("/api/register", (request, response) => {
			const nickname = request.body.nickname
			const pass = request.body.pass
			// -- Check that nickname or password field wasn't empty
			if (nickname.length == 0 || pass.length == 0) {
				response.statusCode = 400
				response.send({success: false})
				return
			}
			// -- Query by nickname to check if it exists already
			this.database.getPersonByNickname([nickname])
			.then((resp) => {
				// -- If nickname existed return false
				if (resp.length > 0) {
					response.statusCode = 403
					response.send({success: false})
					return
				}
				// -- Add new user to database
				const user = [nickname, pass, "customer"]
				this.database.createPerson(user)
				.then((res) => {
					// -- Add to locally stored balance sheet
					this.addUserToBalanceSheet(res[0].id)
					response.send({success: true})
				})
			})
		})

		// Login user
		this.app.post("/api/login", (request, response, next) => {
			const nickname = request.body.nickname
			const pass = request.body.pass
			// -- Check that nickname or password field wasn't empty
			if (nickname.length == 0 || pass.length == 0) {
				response.statusCode = 400
				response.send({success: false})
				return
			}
			this.database.getPersonByNickname([nickname])
			.then((resp) => {
				// -- Check that database query by nickname result is not empty
				if (resp.length > 0) {
					// -- Check if the nickname and password is correct
					if (nickname === resp[0].nickname && pass === resp[0].pass) {
						// -- Link session with user
						this.linkSessionWithUser(request, resp[0].id)
						response.send({success: true})
						return
					}
				}
				// -- If the nickname or password was wrong
				response.statusCode = 400
				response.send({success: false})
			})
		})

		// Logut user
		// Deletes userid from session
		this.app.post("/api/logout", (request, response, next) => {
			delete request.session.userid
			response.send({success: true})
		})

		// Get user by id
		this.app.get("/api/userid/:id", (request, response) => {
			// -- Query database by id
			this.database.getPersonById([request.params.id])
			.then((resp) => {
				// -- Check that response is not empty and send it
				if (resp.length > 0) {
					const user = {id: resp[0].id, nickname: resp[0].nickname}
					response.send({success: true, user: user})
					return
				}
				// -- Else send response with status code 404
				response.statusCode = 404
				response.send({success: false})
			})
		})

		// Get user by nickname
		this.app.get("/api/nickname/:nickname", (request, response) => {
			// -- Query database by nickname
			this.database.getPersonByNickname([request.params.nickname])
			.then((resp) => {
				// -- Check that response is not empty and send it
				if (resp.length > 0) {
					const user = {id: resp[0].id, nickname: resp[0].nickname}
					response.send({success: true, user: user})
					return
				}
				// -- Else send response with status code 404
				response.statusCode = 404
				response.send({success: false})
			})
		})

		// Secure route (every route below this)
		this.app.all(/\/api\/*/, (request, response, next) => {
			// -- If userid not found in session stop execution of this route
			if (!request.session.userid) {
				response.statusCode = 401
				response.send({success: false})
				return
			}
			// -- Userid found in session so continue to secure page
			next()
		})

		// Get balance of user
		this.app.get("/api/balance", (request, response) => {
			const balance = this.getBalanceById(request.session.userid)
			response.send({success: true, balance: balance})
		})

		// Get all transaction requests made by user
		this.app.get("/api/transaction", (request, response) => {
			const userid = request.session.userid
			const reqs = Transactions.getRequestsFromUser(userid)
			response.send({success: true, requests: reqs})
		})

		// Get transaction request by code
		this.app.get("/api/transaction/:code", (request, response) => {
			const code = request.params.code
			const req = Transactions.getRequest(code)
			// -- If request was found
			if (req) {
				response.send({success: true, request: req})
				return
			}
			// -- If request was not found send 404 as response
			response.statusCode = 404
			response.send({success: false})
		})

		// Create a request to get specific amount of coins.
		// Get the uniq code when the request is done
		this.app.post("/api/transactionrequest/:amount", (request, response) => {
			const userid = request.session.userid
			const amount = parseInt(request.params.amount)
			// -- Check that the amount is bigger than zero
			if (amount < 1) {
				response.statusCode = 400
				response.send({success: false})
				return
			}
			const requestCode = this.createTransactionRequest(userid, amount)
			response.send({success: true, requestCode: requestCode})
		})

		// Confirm transaction (send the coins)
		this.app.post("/api/transaction/:code", (request, response) => {
			const code = request.params.code
			const userid = request.session.userid
			this.confirmTransaction(code, userid, (success) => {
				// -- Check that transaction was confirmed successfully
				if (success) {
					popLog("info", "[ROUTE] Transaction confirmed successfully")
					response.send({success: true})
				} else {
					// -- If transaction was not successful, send 400 as response
					popLog("warning", "[ROUTE] Transaction not confirmed")
					response.statusCode = 400
					response.send({success: false})
				}
			})
		})
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
		request.session.userid = userid
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
		let request = Transactions.createRequest(userid, amount)
		return request.code
	}

	/**
	 * Confirms the requested transaction by locking it into the blockchain. The
	 * transaction request is also deleted.
	 * @param {string} code The code received when creating the transaction
	 * request.
	 * @param {number} userid User's id
	 * @param {function} routeCallback The function to call after the promise
	 * resolves.
	 * Customer can only confirm requests made by stores or another customers
	 * Store can only confirm requests made by customers or banks
	 * Bank can only confirm requests made by stores
	 *
	 * OLD BEHAVIOUR: True if the transaction was added to the blockchain
	 * pool. False if there was an error in adding the request, commonly caused
	 * by the request with the given code not being present in the transaction
	 * requests array. Ensure the code was first created with
	 * 'createTransactionRequest'. The request code will only be deleted if the
	 * returned value is true.
	 */
	confirmTransaction(code, userid, routeCallback) {
		// -- Get transaction request with the given code - else return false
		popLog("info", "[SERVER] Starting to confirm transaction")
		let request = Transactions.getRequest(code)
		if (!request) {
			routeCallback(false)
			return
		}

		let confirmerType = balanceSheet[userid].type
		let requesterType = balanceSheet[request.userid].type

		// -- If confirmer is customer and requester is bank return false
		if (confirmerType === "customer" && requesterType === "bank") {
			routeCallback(false)
			return
		}

		// -- If confirmer is store and requester is store return false
		if (confirmerType === "store" && requesterType === "store") {
			routeCallback(false)
			return
		}

		// -- If confirmer is bank and requester is not a store
		if (confirmerType === "bank" && requesterType != "store") {
			routeCallback(false)
			return
		}

		// -- Check that user has enough coins for transactions
		let userBalance = this.getBalanceById(userid)
		if (userBalance < request.amount) {
			routeCallback(false)
			return
		}

		// -- Create transaction data
		let data = {
			"from": userid,
			"to": request.userid,
			"amount": request.amount,
		}

		// -- Create and add block to blockchain
		let block = this.blockchain.createBlock(data,
			this.blockchain.getLength() - 1)
		let successfullyAdded = this.blockchain.addBlock(block)
		if (!successfullyAdded) {
			routeCallback(false)
			return
		}

		// -- Add block to database
		popLog("info", "[SERVER] Starting to add block to database")
		this.database.createBlock([block.previousHash, block.data, block.nonce,
		block.hash])
		.then((resp) => {
			popLog("info", "[SERVER] Block added to database")
			// -- Update balance scheet
			this.updateBalanceSheet(data.from, data.to, data.amount)
			// -- Delete transaction request
			Transactions.deleteRequest(code)
			popLog("info", "[SERVER] Ending confirm transaction")
			routeCallback(true)
			return
		})
		.catch(() => {
			routeCallback(false)
			return
		})
	}

	/**
	* Creates balance sheet to store coin amount and user type with userid.
	* Fetches all persons from database and sets their balance to zero, and then
	* fetches all blocks from database and updates the balance sheet accordingly
	* to the transactions. Note that the first block with the initial transfer for
	* the bank, determining the total amount of coins in distribution, does not
	* come from any person in the database, so only the bank is added to the
	* balance sheet with the first transaction.
	*/
	createBalanceSheet() {
		popLog("info", "[SERVER] Creating balance sheet")
		// -- Set every persons balance to 0 and declare user type
		this.database.getPersonAll()
		.then((resp) => {
			for (let i = 0; resp[i] != null; i++) {
				if (resp[i].id != null) {
					const userid = resp[i].id
					balanceSheet[userid] = {amount: 0, type: resp[i].type}
				}
			}
			// -- Go through every block's transaction and update balances accordingly
			this.database.getBlockAll()
			.then((resp) => {
				for (let i = 0; resp[i] != null; i++ ) {
					const from = resp[i].body.from
					const to = resp[i].body.to
					const amount = resp[i].body.amount
					this.updateBalanceSheet(from, to, amount)
				}
				popLog("info", "[SERVER] Balance sheet created")
			})
		})
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
			balanceSheet[from] = {
				amount: (balanceSheet[from].amount - amount),
				type: balanceSheet[from].type,
			}
		}
		// -- Update receiver's balanceSheet
		if (to in balanceSheet) {
			balanceSheet[to] = {
				amount: (balanceSheet[to].amount + amount),
				type: balanceSheet[to].type,
			}
		}
	}

	/**
	* Adds new registered user to balance sheet
	* @param {number} userid User's id
	*/
	addUserToBalanceSheet(userid) {
		balanceSheet[userid] = {amount: 0}
	}

	/**
	* Get user's balance by id from balanceSheet
	* @param {object} id User's id
	* @return {number} User's balance
	*/
	getBalanceById(id) {
		if (id in balanceSheet) {
			return balanceSheet[id].amount
		}
		return false
	}

	/**
	* Get bank's balance from balanceSheet, hardcoded with bank's id
	* @return {number} Bank's balance
	*/
	getBankBalance() {
		if (1 in balanceSheet) {
			return balanceSheet[1].amount
		}
		return false
	}

	/**
	* Calculates the total number of coins in balance sheet
	* @return {number} Total number of coins
	*/
	getCirculationBalance() {
		let coinAmount = 0
		for (let id in balanceSheet) {
			if (balanceSheet.hasOwnProperty(id)) {
				coinAmount += balanceSheet[id].amount
			}
		}
		return coinAmount
	}

	/**
	* Initializes the blockchain in servers memory by fetching all the blocks
	* from database and passing them to loadBlockChain function, which adds
	* them to blockchain array.
	*/
	initializeBlockchain() {
		this.database.getBlockAll()
		.then((resp) => {
			this.blockchain.loadBlockchain(resp)
		})
	}

	/**
	 * Gets the calculated value of a single coin. This can also be considered
	 * the 'stock price' of the coin.
	 * The value can be manipulated with a push value in the formula, which
	 * encourages the movement of coins into or out of the bank.
	 * Defaults to a nominal value of 5, with a centered lookup, resulting in
	 * a constant 5 being returned if the required functions can not be found.
	 * @return {number} The calculated value of the coin.
	 */
	getCalculatedValue() {
		const nominalPrice = 5
		// const bankBalance = typeof getBankBalance !== "undefined"
		//	? getBankBalance() : 10
		// const circulationBalance = typeof getCirculationBalance !== "undefined"
		//	? getCirculationBalance() : 20
		const bankBalance = this.getBankBalance()
		const circulationBalance = this.getCirculationBalance()
		const pushFactor = 0 // -- Less than 0 -> Encourage flow TOWARDS bank
		return nominalPrice / (Math.pow((bankBalance/circulationBalance)
			+ 0.5 + pushFactor, 8))
	}
}
