"use strict";

var _blockchain = require("./blockchain");

var _blockchain2 = _interopRequireDefault(_blockchain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mychain = new _blockchain2.default();

for (let i = 0; i < 10; i++) {
	let block = mychain.createBlock("hello", i - 1);
	mychain.addBlock(block);
}

console.log(mychain.getLength());
console.log(mychain.isValid());