/**
 * @module WebServer
 */

import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import session from "express-session"
import * as Transactions from "./transactions"
import * as _ from "lodash"

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
		this.port = process.env.PORT | 3000
		this.setupRoutes()
		this.startListening()
	}
	startListening() {
		console.log("[INFO][SERVER] Listening now")
		this.app.listen(this.port)
	}
	setupRoutes() {
		// API description
		this.app.get("/api/", (request, response) => {
			response.send("API - Description")
		})

		// Initialize database
		this.app.post("/api/admin/initdatabase", (request, response, next) => {
			this.database.init()
			response.send(true)
		})

		// Register new user
		this.app.post("/api/register", (request, response) => {
			const nickname = request.body.nickname
			const pass = request.body.pass
			// -- Check that nickname or password field wasn't empty
			if (nickname.length == 0 || pass.length == 0) {
				response.send("Nickname or password field was empty!")
				return
			}
			// -- Query by nickname to check if it exists already
			this.database.getPersonByNickname([nickname])
			.then((resp) => {
				// -- If nickname existed inform client
				if (resp.length > 0) {
					response.send("Nickname existed, can't create new user")
					// -- Else create new user
				} else {
					const user = [nickname, pass]
					this.database.createPerson(user)
					.then((res) => {
						response.send("User created!")
					})
				}
			})
		})

		// Login user
		this.app.post("/api/login", (request, response, next) => {
			const nickname = request.body.nickname
			const pass = request.body.pass
			this.database.getPersonByNickname([nickname])
			.then((resp) => {
				// -- Check that database query by nickname result is not empty
				if (resp.length > 0) {
					// -- Check if the nickname and password is correct
					if (nickname === resp[0].nickname && pass === resp[0].pass) {
						// -- Link session with user
						this.linkSessionWithUser(request, resp[0].id)
						response.send(true)
					}
				}
				// -- If the nickname or password was wrong
				// -- Stop execution of this route
				response.send(false)
				return
			})
		})

		// Logut user
		// Deletes userid from session
		this.app.post("/api/logout", (request, response, next) => {
			delete request.session.userid
			response.send(true)
		})

		// Get user by nickname
		this.app.get("/api/nickname/:nickname", (request, response) => {
			this.database.getPersonByNickname([request.params.nickname])
			.then((resp) => {
				console.log(resp)
				response.send("finished")
			})
		})

		// Secure route (every route below this)
		this.app.all(/\/api\/*/, (request, response, next) => {
			// -- If userid not found in session stop execution of this route
			if (!request.session.userid) {
				response.send(false)
				return
			}
			// -- Userid found in session so continue to secure page
			next()
		})

		// Get balance of user
		this.app.get("/api/balance", (request, response) => {
			const balance = this.getBalanceById(request.session.userid)
			response.send("Your balance is: " + balance)
		})

		// Get all transaction requests made by user
		this.app.get("/api/transaction", (request, response) => {
			const userid = request.session.userid
			const req = Transactions.getRequestsFromUser(userid)
			response.send(req)
		})

		// Get transaction by code
		this.app.get("/api/transaction/:code", (request, response) => {
			const code = request.params.code
			const req = Transactions.getRequest(code)
			response.send(req)
		})

		// Create a request to get specific amount of coins.
		// Get the uniq code when the request is done
		this.app.post("/api/transactionrequest/:amount", (request, response) => {
			const userid = request.session.userid
			const amount = parseInt(request.params.amount)
			const requestCode = this.createTransactionRequest(userid, amount)
			response.send("Request created! Code: " + requestCode)
		})

		// Confirm transaction (send the coins)
		this.app.post("/api/transaction/:code", (request, response) => {
			const code = request.params.code
			const userid = request.session.userid
			this.confirmTransaction(code, userid)
			console.log("[INFO][ROUTE] Transaction confirmed successfuly")
			response.send("Transaction done!")
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
	 * @return {boolean} True if the transaction was added to the blockchain
	 * pool. False if there was an error in adding the request, commonly caused
	 * by the request with the given code not being present in the transaction
	 * requests array. Ensure the code was first created with
	 * 'createTransactionRequest'. The request code will only be deleted if the
	 * returned value is true.
	 */
	confirmTransaction(code, userid) {
		// -- Get transaction request with the given code - else return false
		console.log("[INFO][SERVER] Starting to confirm transaction")
		let request = Transactions.getRequest(code)
		if (!request) {
			return false
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
			console.log("Something failed")
			// return false
		}

		// -- Add block to database
		this.database.createBlock([block.previousHash, block.data, block.nonce,
		block.hash])
		.then((resp) => {
			// -- Update balance scheet
			this.updateBalanceSheet(data.from, data.to, data.amount)
			// -- Delete transaction request
			Transactions.deleteRequest(code)
			// return true
			console.log("[INFO][SERVER] Ending confirm transaction")
		})
	}

	/**
	* Creates balance sheet
	*/
	createBalanceSheet() {
		console.log("[INFO][SERVER] Creating balance scheet")
		// -- Set every persons balance to 0
		this.database.getPersonAll()
		.then((resp) => {
			for (let i = 0; resp[i] != null; i++) {
				if (resp[i].id != null) {
					const userid = resp[i].id
					balanceSheet[userid] = {amount: 0}
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
			balanceSheet[from] = {amount: (balanceSheet[from].amount - amount)}
		}
		// -- Update receiver's balanceSheet
		if (to in balanceSheet) {
			balanceSheet[to] = {amount: (balanceSheet[to].amount + amount)}
		}
	}
	/**
	* Get user's balance by id
	* @param {object} id User's id
	* @return {object} User's balance
	*/
	getBalanceById(id) {
		if (id in balanceSheet) {
			return balanceSheet[id].amount
		}
		return false
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
}
