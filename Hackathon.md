## Inspiration

## What it does

Our application for the EthDenver hackathon is called CC, which is a reference to CreativeCommons licensing and carbon copying (cc-ing) someone on an email. 

CC allows creators to track distribution of their digital content via the blockchain's immutable transaction history.

The idea is allow creators to upload their content to IPFS and simultaneously claim their ownership of it. 

Patrons of their work can also ask for permission to use the work by submitting a request with their proposed uses.

The creator can then allow or deny each user based on their proposal.

## How we built it

We came together over the idea, met over dinner after all meeting on the EthDenver Slack Group, story mapped, brainstormed & broke down the steps, utilized everyone's unique expertise to delegate components of the build, and then stitched all the moving pieces.

Design: Amy. 
Front-End: Will.
Back-End: Lucas.

Mention: Artur who we lost to the pork sickness frenzy.

We built this Dapp with Truffle, React, Redux, OpenZepplin contracts, Figma and Metamask. We use Infura's IPFS service for image uploads.

## Challenges we ran into

Back-End & Front-End
The major challenges we hit were with Solidity. Late into Saturday night, we began testing the encoding and decoding of the IPFS hash coming through the contract. That ID is unique and crucial to our implementation.

We sadly realized that an IPFS hash is `~34 bytes` and Solidity supports only `bytes32`. So the creation, storage and retrieval of those ids, as we had designed it, will not work.

Solidity also does not support nested arrays, so converting the `bytes32` to strings and returning a dynamic array of strings (like `string[]`) was not a workable solution inside the time frame.

User Experience Design Iterations

As we faced challenges with the development, the scope of our work quickly changed. There were lots of versions of the user flow. The features were constantly in flux, dependent on the possibilities for implementation.

## Accomplishments that we’re proud of

Connecting IPFS, writing complex smart contracts, Amy learning to code React

## What we learned

Connecting multiple smart contracts together, using Web3 with React.

## What’s next for CC: Creative Commons

There are many potential grow opportunities for CC. There could be added payments, license options, and community plug-ins!
