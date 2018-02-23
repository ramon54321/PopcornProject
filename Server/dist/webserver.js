"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebServer {
	constructor() {
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
}
exports.default = WebServer;