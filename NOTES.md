https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods

// get img instance
Images.deployed().then(function(instance) { img = instance; })

// read images back
account1 = web3.eth.accounts[0]
account2 = web3.eth.accounts[1]

// create new image
img.createNewImage("test", true, "cats", { from: account1 })
img.imagesForCreator.call(account1, { from: account2 })

img.createNewImage("anotherOne", true, "cats", { from: account2 })
img.imagesForCreator.call(account2, { from: account2 })


// image request
img.requestImageUse.call("test", { from: account2 })
