# moon 🌙

Exploring what a better IPFS gateway and an IPFS "exchange", (like bitswap or graphsync) over http would look like.

A cloudflare worker to front ipfs.io and nft.storage

**experiemental. do not consume.** 🧪⛔️👅 

## Getting started

- Install the deps `npm i`
- Create a cloudflare worker in the dashboard
- Update wrangler.toml with your worker env details
- `wrangler dev --env <your env>`

## Routes

Using CAR files as the unit of exchange gives us the blocks and their CIDs for a given tree.

- `HEAD /car/:cid`
- `GET /car/:cid`
- `PUT /car/:cid` 
- `POST /car` _(TBC) would be useful for rootless CARs*_
- `HEAD /block/:cid`
- `GET /block/:cid`
- `PUT /block/:cid`


### `HEAD /car/:cid`

Get the size of a CAR file for all blocks in the tree starting at the root `:cid` as the

```console
$ curl -I 'http://127.0.0.1:8787/car/bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu'
HTTP/1.1 200 OK
date: Mon, 14 Jun 2021 08:30:56 GMT
content-length: 564692
```

### `GET /car/:cid`

Get the CAR file containing all blocks in the tree starting at the root `:cid`

```console
$ curl -sD - 'http://127.0.0.1:8787/car/bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu'
HTTP/1.1 200 OK
date: Mon, 14 Jun 2021 09:12:41 GMT
content-type: application/car
cache-control: public, max-age=10
content-disposition: attachment; filename="bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.car"
```


## Notes

### Rootless CARs

We already have the notion of rootless CAR files that are just containers for a set of blocks. The spec allows for an [empty roots header](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md#number-of-roots) in the CAR. It offers a workaround of providing the the empty identity CID as the root for tools that require CARs to have a root. Anecodtally we already use rootless CARs to stream very large trees to CARs without setting the root first, and then follow up with a rooted CAR afterwards once we have processed the entire stream. As such, we should consider support for `POST /car` where the sender doesn't yet know the root ahead of time.
