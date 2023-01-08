const AVAILABLE_METHODS = [
	// Blockchain
	"getBestBlockHash",
	"getBlock",
	"getBlockchainInfo",
	"getBlockCount",
	"getBlockHash",
	"getBlockHeader",
	"getBlockStats",
	"getChainTips",
	"getChainTxStatus",
	"getDifficulty",
	"getMemPoolAncestors",
	"getMemPoolDescendants",
	"getmemPoolEntry",
	"getMemPoolInfo",
	"getRawMemPool",
	"getTxOut",
	"getTxOutProof",
	"getTxOutSetInfo",
	"preciousBlock",
	"pruneBlockchain",
	"saveMemPool",
	"scanTxOutSet",
	"verifyChain",
	"verifyTxOutProof",

	// control
	"getMemoryInfo",
	"getRpcInfo",
	"help",
	"logging",
	"stop",
	"uptime",

	// generating
	"generate",
	"generateToAddress",

	// mining
	"getBlockTemplate",
	"getMiningInfo",
	"getNetworkHashps",
	"prioritiSetTransaction",
	"submitBlock",
	"submitHeader",

	// network
	"addNode",
	"clearBanned",
	"disconnectNode",
	"getAddedNodeInfo",
	"getConnectionOnCount",
	"getNetTotals",
	"getNetworkInfo",
	"getNodeAddresses",
	"getPeerInfo",
	"listBanned",
	"ping",
	"setBan",
	"setNetworkActive",

	// raw transactions
	"analyzePsbt",
	"combinePsbt",
	"combineRawTransaction",
	"convertToPsbt",
	"createPsbt",
	"createRawTransaction",
	"decodePsbt",
	"decodeRawTransaction",
	"decodeScript",
	"finalizePsbt",
	"fundRawTransaction",
	"getRawTransaction",
	"joinPsbts",
	"sendRawTransaction",
	"signRawTransaction",
	"testMemPoolAccept",
	"utxoUpdatePsbt",
	//util
	"createMultiSig",
	"deriveAddresses",
	"estimateSmartFee",
	"getDescriptorInfo",
	"signMessageWithPrivateKey",
	"validateAddresses",
	"verifyMessage",

	// wallet
	"abandonTransaction",
	"abortRescan",
	"addMultiSigAddress",
	"backupWallet",
	"bumpFee",
	"createWallet",
	"dumpPrivKey",
	"dumpWallet",
	"encryptWallet",
	"getAddressesByLabel",
	"getAddressInfo",
	"getBalance",
	"getNewAddress",
	"getRawChangeAddress",
	"getReceivedByAddress",
	"getReceivedByLabel",
	"getTransaction",
	"getUnconfirmedBalance",
	"getWalletInfo",
	"importAddress",
	"importMulti",
	"importPrivKey",
	"importPrunedFunds",
	"importPubKey",
	"importWallet",
	"keyPoolRefill",
	"listAddressGroupings",
	"listLabels",
	"listLockUnspent",
	"listReceivedByAddress",
	"listReceivedByLabel",
	"listSinceBlock",
	"listTransactions",
	"listUnspent",
	"listWalletDir",
	"listWallets",
	"loadWallet",
	"lockUnspent",
	"removePrunedFunds",
	"rescanBlockchain",
	"sendMany",
	"sendToAddress",
	"setHDSeed",
	"setLabel",
	"setTxFee",
	"signMessage",
	"signRawTransactionWithHDWallet",
	"unloadWallet",
	"walletCreateFundedPsbt",
	"walletLock",
	"walletPassphrase",
	"walletPassphraseChange",
	"walletProcessPsbt",

	//zmq
	"getZmqNotifications"
];

const NETWORKS = {
	mainnet: 9332,
	regtest: 19332,
	testnet: 19332
};

export default function Client(config) {
	config.host = config.host || "127.0.0.1";
	config.network = config.network || "mainnet";
	config.port = config.port || NETWORKS[config.networks];

	if(!config.user || !config.password) 
		return new Error("User and password required");
	
	const BASE_URL = `http://${config.host}:${config.port}`;
	const auth = new Buffer.from(config.user + ":" + config.password).toString("base64");

	const request_rpc = (method, ...params) => {
		const request_params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${auth}`
			},
			body: JSON.stringify({
				method,
				params
			})
		};

		return fetch(BASE_URL, request_params)
			.then(res => res.json())
			.then(({ error, result }) => {
				if (error) return `RPC ERROR: [${method}] (${error.code}) ${error.message}`;
				return result;
			});
	}

	return AVAILABLE_METHODS.reduce((obj, req) => {
		obj[req] = (...args) => request_rpc(req.toLowerCase(), ...args);
		return obj;
	}, {});
}