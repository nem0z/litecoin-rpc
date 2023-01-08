import Client from '../client.js';
import config from './config.js';

const client = Client(config);
const block_hash = "344fe7927e6a3723b21ec0ec6b9f31d722ac03d667dd10d209b00047380370bb";

client.getBlock(block_hash)
    .then(block => console.log("Block retrived :\n", block))
    .catch(console.error);
