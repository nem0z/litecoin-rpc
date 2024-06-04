# Litecoin-RPC

## Intro

This module is an update of [litecoin-core](https://www.npmjs.com/package/litecoin-core) by [@tacyarg](https://www.npmjs.com/~tacyarg)

`litecoin-rpc` is a basic RPC client for `litecoin-core` (also compatible with `bitcoin-core` and others...)

It's built using TypeScript and ES modules, meaning you can integrate it in your `TS` projects.
It's also compatible with vanilla JavaScript, and you can use it in your web projects.

## Installation

Install using `npm`:

```sh
    npm install litecoin-rpc
```

## Example

```javascript
    import Client from 'litecoin-rpc';

    const client = Client({
        user: "<user_rpc>"
        password: "<password_rpc>" 
    });

    const block_hash = "344fe7927e6a3723b21ec0ec6b9f31d722ac03d667dd10d209b00047380370bb";

    client.getBlock(block_hash)
        .then(block => console.log("Block retrived :\n", block))
        .catch(console.error);
```

