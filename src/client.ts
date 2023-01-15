import { RPCMethods } from "./rpc_methods.js";
import { Network } from "./networks.js";
import type { Config } from "./types.js";

export default function Client(config: Config) {
    const { 
        host = "127.0.0.1", 
        network = Network.mainnet, 
        port: tmp_port, 
        user, 
        password 
    } = config;
    
	const port = tmp_port || network;

	const BASE_URL = `http://${host}:${port}`;
	const auth = Buffer.from(`${user}:${password}`).toString("base64");

	const request_rpc = (method: string, ...params: any[]) => {
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
			.then(({ error, result }: any) => {
				if (error) return `RPC ERROR: [${method}] (${error.code}) ${error.message}`;
				return result;
			});
	}

    const methods_array = Object.keys(RPCMethods).filter(x => isNaN(Number(x)));
	return methods_array.reduce((obj: any, req: string) => {
		obj[req] = (...args: any) => request_rpc(req.toLowerCase(), ...args);
		return obj;
	}, {});
}

