import Client from 'litecoin-rpc';

const config = {
    user: "MyTwitter",
    password: "OMGThisIsMySuperPassWord@137"
}

const client = Client(config);
const block_hash = "ffe180203d49d31d7d3b5bdfa66f4222c56cf4a07c599566aacb09f62df51107";

Client.getBlock(block_hash)
    .then(block => console.log(`Retrive block from hash ${block_hash} : \n`, block))
    .catch(err => console.error(`Caught error ${err}`));
