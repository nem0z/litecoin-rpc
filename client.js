import { AVAILABLE_METHODS, NETWORKS } from "./config.js";

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