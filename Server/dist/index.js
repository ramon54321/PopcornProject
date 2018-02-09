"use strict";

var _blockchain = require("./blockchain");

var Blockchain = _interopRequireWildcard(_blockchain);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let block = Blockchain.createBlock({ name: "hannu" }, -1);
Blockchain.addBlock(block);
block = Blockchain.createBlock({ name: "ramon" }, 0);
Blockchain.addBlock(block);
block = Blockchain.createBlock({ name: "aelitta" }, 1);
Blockchain.addBlock(block);
block = Blockchain.createBlock({ name: "bob" }, 2);
Blockchain.addBlock(block);

console.log(Blockchain.blockchain);