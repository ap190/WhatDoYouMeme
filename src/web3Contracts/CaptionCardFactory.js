import web3 from '../web3';

const address = "0x2a4c4daf465f6a730657e3b3d7a72b5c4a4135d2";
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_captionText",
				"type": "string"
			}
		],
		"name": "addCaptionCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getCaptionCardsLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "card",
				"type": "address"
			}
		],
		"name": "CaptionCardCreated",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "captionCards",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "existingCards",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var CaptionCardFactory = new web3.eth.Contract(abi, address);
export default CaptionCardFactory;
