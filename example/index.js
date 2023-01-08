import Client from '../index.js';
import config from './conf.js';

const client = Client(config);
const block_hash = "9c4046f5c46dd0d7fb55ddd09f89d808f57d9e54228eba913aa181cf5dcb2283";

client.getBlock(block_hash)
    .then(block => console.log("Block retrived :\n", block))
    .catch(console.error);
