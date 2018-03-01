/**
 * @module WebServer
 */

import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import * as Transactions from "./transactions"

export default class WebServer {
	constructor(blockchain) {
		this.blockchain = blockchain
		this.sessions = {}

		this.app = express()
		this.app.use(cookieParser())
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
		this.app.post("/api/login", (request, response, next) => {
			let user = {} // Get user from database

			// -- If the password or username was wrong
			if (!user) {
				response.send(false)

				// -- Stop execution of this route
				return next()
			}

			// -- Link session with user
			this.linkSessionWithUser(request)
			response.send(true)
		})
		this.app.get("/api/protected", (request, response) => {
			if (request.session.userid == 5) {
				console.log("Valid")
			} else {
				console.log("Invalid")
			}

			response.send()
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
}
