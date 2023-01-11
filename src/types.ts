import type { Network } from "./networks";

interface Config {
    host    ?: string
    port    ?: string | number
    network ?: Network
    user    : string
    password: string
}

export { Config };