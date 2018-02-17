https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods

// get img instance
Images.deployed().then(function(instance) { img = instance; })

// create new image
img.createNewImage("test", true)

// read images back
account = web3.eth.accounts[0]
var count = img.numberOfImages()
// unhandled promise?
