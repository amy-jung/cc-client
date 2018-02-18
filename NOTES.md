https:* [ ]github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods

* [ ] get img instance

Images.deployed().then(function(instance) { img = instance; })
account1 = web3.eth.accounts[0]
account2 = web3.eth.accounts[1]

* [ ] create new image

img.createNewImage("test", true, "cats", { from: account1 })

* [ ] all images

img.allImages.ca;;();

* [ ] all images for a creator

img.imagesForCreator.call(account1, { from: account2 })

* [ ] all images for a patron

img.requestImageUse.call("test", { from: account2 })
img.allowedImagesForPatron.call(account1, { from: account2 })


* [ ] all images for a tag

* [ ] image info (by hash) for owner, number of requests, etc

* [ ] image request
