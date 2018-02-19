"use strict";

var _blockchain = require("./blockchain");

var _blockchain2 = _interopRequireDefault(_blockchain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mychain = new _blockchain2.default();

let myTransaction = { from: "Alex", to: "Hannah", amount: 56 };

for (let i = 0; i < 10; i++) {
	let block = mychain.createBlock(myTransaction, i - 1);
	mychain.addBlock(block);
	console.log(block.hash);
}

console.log(mychain.getLength());
console.log(mychain.isValid());