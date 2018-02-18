# CC

![cc logo](https://imgur.com/a/F9Yde)

Our application for the EthDenver hackathon is called CC, which is a reference to CreativeCommons licensing and carbon copying (cc-ing) someone on an email.

The idea is allow creators to upload their content to IPFS and simultaneously claim their ownership of it.

Patrons of their art can also ask for permission to use the work by submitting a request with their proposed uses.

The creator can then allow or deny each user based on their proposal.

# Getting Started

To run this project, run the following commands after cloning this repo.

```bash
$ npm install
$ truffle develop

truffle-develop > compile
truffle-develop > migrate
```

To run the front end, `$ npm run start` which will open `localhost:3000` for you.

# Interacting with the Smart Contract

### get img contract instance and accounts

```solidity
Images.deployed().then(function(instance) { img = instance; })
account1 = web3.eth.accounts[0]
account2 = web3.eth.accounts[1]
```

### Create a new image reference

The arguments are the ipfs hash, whether the image is public or not and one tag to describe the image. In this case "charts".

```solidity
img.createNewImage("QmZEeLvqfDJnihzoLWdgfQxDu9U3emLPbxbcG8HyyWxC8S", true, "charts", { from: account1 })
```

### See all Image Hashes

```solidity
img.allImages.call();
img.numberOfImages.call();
```


### See all images for a creator and their request count

```solidity
img.publicImagesForCreator.call(account2, { from: account2 })
img.imageRequestCount.call("test", { from: account1} )

img.createNewImage("test3", false, "cats", { from: account2 })
img.privateImagesForCreator.call(account2, { from: account2 })
```

### See all the images a patron has permission to use

```solidity
img.allowedImagesForPatron.call(account2, { from: account2 })
```

### Edit Image's Private/Public Status
If a user decides they want to turn a private image public, they can update their own image.

```solidity
// if I said this initially
img.createNewImage("test3", false, "cats", { from: account2 })

// it will not show up in public images with
img.publicImagesForCreator.call(account2, { from: account2 })

// but I can edit my own images, identified by their hash
img.editImageIsPublic("test3", true, { from: account2 })

// and it will now show up in all images.
img.allImages.call();
```

There is no support for moving an image from public to private, since it is being uploaded to IPFS.

### Image Tags

Find all image hashes for a given tag with

```solidity
img.imagesForTag.call("cats")
```

# Permissions

Get an instance of our deployed Permission contract in truffle develop console.

```solidity
Permission.deployed().then(function(instance) { per = instance; })
```

A Patron can request to use an image, which notifies the Creator.

```solidity
per.requestImageUse("test", "hey I would like to use this image plz", { from: account2 })

// check on the permission status
per.getPermissionStatus.call(account2, "test", { from: account2 })
```

The owner of the image can give permission (true/false) based on what they think of the request.

```solidity
per.imageRequestDecision("test", true, account2, { from: account1 })
```

This will add the Patron's address to the allowed images.

```solidity
per.allowedImagesForPatron.call(account2, { from: account2 })
```


* [ ] image info (by hash) for owner, number of requests, etc
