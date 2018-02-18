## Inspiration

## What it does

Our application for the EthDenver hackathon is called CC, which is a reference to CreativeCommons licensing and carbon copying (cc-ing) someone on an email.

The idea is allow creators to upload their content to IPFS and simultaneously claim their ownership of it.

Patrons of their art can also ask for permission to use the work by submitting a request with their proposed uses.

The creator can then allow or deny each user based on their proposal.

## How we built it

Firstly, this is Amy's fantastic idea, aesthetic, designs and clever name. So we started there with a brainstorm over dinner after all meeting on the EthDenver Slack Group.

We discussed the idea and came to a mutual understanding, making designs and story mapping along the way.

We built this Dapp with Truffle, React, Redux, OpenZepplin contracts and Metamask. We use Infura's IPFS service for image uploads.

## Challenges we ran into

The major challenges we hit were with Solidity. Late into Saturday night, we began testing the encoding and decoding of the IPFS hash coming through the contract. That ID is unique and crucial to our implementation.

We sadly realized that an IPFS hash is `~34 bytes` and Solidity supports only `bytes32`. So the creation, storage and retrieval of those ids, as we had designed it, will not work.

Solidity also does not support nested arrays, so converting the `bytes32` to strings and returning a dynamic array of strings (like `string[]`) was not a workable solution inside the time frame.

## Accomplishments that we’re proud of

Connecting IPFS, writing complex smart contracts

## What we learned

Connecting multiple smart contracts together, using Web3 with React.

## What’s next for CC: Creative Commons
