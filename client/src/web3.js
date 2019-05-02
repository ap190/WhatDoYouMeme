const Web3 = require('web3');
var web3 = "undefined"
try {
  web3 = new Web3(window.ethereum);
} catch {
  console.log("Web3 is not injected");
}

export default web3;
