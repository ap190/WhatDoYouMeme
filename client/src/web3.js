const Web3 = require('web3');
const INFURA_API_KEY = "ce194961ac23455cadc1f3196b5f8e64";
const rpcURL = "https://ropsten.infura.io/v3/" + INFURA_API_KEY;
const web3 = new Web3(window.web3.currentProvider);
export default web3;
