import express from "express"

export default class WebServer {
	constructor() {
		this.app = express()
		this.port = process.env.PORT | 3000
		this.setupRoutes()
		this.startListening()
	}
	setupRoutes() {
		this.app.get("/api/", (request, response) => {
			response.send("API - Description")
		})
	}
	startListening() {
		this.app.listen(this.port)
	}
}
