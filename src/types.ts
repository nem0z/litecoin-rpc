import type { Network } from "./networks.js";

interface Config {
    host    ?: string
    port    ?: string | number
    network ?: Network
    user    : string
    password: string
}

export { Config };