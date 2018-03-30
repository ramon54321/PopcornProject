/**
 * @module WebServer
 */

import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import session from "express-session"
import * as Transactions from "./transactions"
import * as _ from "lodash"


const users = [
	{userid: 0, nickname: "Bobby", password: "bobby123"},
	{userid: 1, nickname: "Andy", password: "andy123"},
	{userid: 2, nickname: "Jane", password: "jane123"},
]

let balanceSheet = {}


export default class WebServer {
	constructor(blockchain, database) {
		this.blockchain = blockchain
		this.database = database
		this.sessions = {}
		this.createBalanceSheet()

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
		this.app.listen(this.port)
	}
	setupRoutes() {
		this.app.get("/api/", (request, response) => {
			response.send("API - Description")
		})
		this.app.post("/api/admin/initdatabase", (request, response, next) => {
			this.database.init()
			response.send(true)
		})
		this.app.get("/api/nickname/:nickname", (request, response) => {
			this.database.getPersonByNickname([request.params.nickname])
			.then((resp) => {
				console.log(resp)
				response.send("finished")
			})
		})
		this.app.post("/api/login", (request, response, next) => {
			const user = _.find(users, (user) => {
				return user.nickname == request.body.nickname
			})

			// -- If the password or username was wrong
			if (!user) {
				response.send(false)

				// -- Stop execution of this route
				return
			}
			console.log("Linking session.")

			// -- Link session with user
			this.linkSessionWithUser(request, user.userid)
			response.send(true)
		})
		this.app.post("/api/logout", (request, response, next) => {
			delete request.session.userid
			response.send(true)
		})
		this.app.all(/\/api\/*/, (request, response, next) => {
			const user = _.find(users, (user) => {
				return user.userid == request.session.userid
			})

			if (!user) {
				response.send(false)

				// -- Stop execution of this route
				return
			}

			console.log("Thanks for viewing the secret page " + user.nickname + "!")
			next()
		})

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
		// Get balance of the current user
		this.app.get("/api/balance", (request, response) => {
			const balance = this.getBalanceById(request.session.userid)
			response.send("Your balance is: " + balance)
		})
	}

	startListening() {
		console.log("Listening now")
		this.app.listen(this.port)
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
	 * @return {boolean} True if the transaction was added to the blockchain
	 * pool. False if there was an error in adding the request, commonly caused
	 * by the request with the given code not being present in the transaction
	 * requests array. Ensure the code was first created with
	 * 'createTransactionRequest'. The request code will only be deleted if the
	 * returned value is true.
	 */
	confirmTransaction(code) {
		// -- Get transaction request with the given code - else return false
		let request = Transactions.getRequest(code)
		if (!request) {
			return false
		}

		// -- Create transaction data
		let data = {
			// some transaction data here
		}

		// -- Create and add block to blockchain
		let block = this.blockchain.createBlock(data,
			this.blockchain.getLength() - 1)
		let successfullyAdded = this.blockchain.addBlock(block)
		if (!successfullyAdded) {
			return false
		}

		// -- Delete transaction request
		Transactions.deleteRequest(code)

		return true
	}

	/**
	* Creates balance sheet
	* Fetches all blocks from database
	* Goes through every block's transaction and updates balances accordingly
	*/
	createBalanceSheet() {
		console.log("[INFO][SERVER] Creating balance scheet")
		this.database.getBlockAll()
		.then((resp) => {
			for (let i = 0; resp[i] != null; i++ ) {
				const from = resp[i].body.from
				const to = resp[i].body.to
				const amount = resp[i].body.amount
				this.updateBalanceSheet(from, to, amount)
			}
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
		let userAmount = 0
		if (from in balanceSheet) {
			userAmount = balanceSheet[from].amount
		}
		balanceSheet[from] = {amount: (userAmount - amount)}
		// -- Update receiver's balanceSheet
		userAmount = 0
		if (to in balanceSheet) {
			userAmount = balanceSheet[to].amount
		}
		balanceSheet[to] = {amount: (userAmount + amount)}
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
}
