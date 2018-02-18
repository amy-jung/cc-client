https:* [ ]github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods

# Image Stuff
* [ X ] get img instance

Images.deployed().then(function(instance) { img = instance; })
account1 = web3.eth.accounts[0]
account2 = web3.eth.accounts[1]

* [ X ] create new image

img.createNewImage("test", true, "cats", { from: account1 })
img.createNewImage("test2", true, "cats", { from: account2 })

* [ X ] all images

img.allImages.call();
img.numberOfImages.call();

* [ X ] all images for a creator and the request count

img.publicImagesForCreator.call(account2, { from: account2 })
img.imageRequestCount.call("test", { from: account1} )

img.createNewImage("test3", false, "cats", { from: account2 })
img.privateImagesForCreator.call(account2, { from: account2 })

* [X] all permissioned images for a patron

img.allowedImagesForPatron.call(account2, { from: account2 })

* [X] Edit Image

img.createNewImage("newerImageHash", false, "cats", { from: account2 })
img.publicImagesForCreator.call(account2, { from: account2 })

img.editImageIsPublic("test3", true, { from: account2 })

img.allImages.call();

* [ X ] Tags

img.imagesForTag.call("cats")

# Permission Stuff

account1 = web3.eth.accounts[0]
account2 = web3.eth.accounts[1]

Permission.deployed().then(function(instance) { per = instance; })

per.requestImageUse("test", { from: account2 })
per.numberOfPermissions.call(account2, { from: account2 })
per.getPermissionStatus.call(account2, "test", { from: account2 })

* [X] allow permission
* [ ] deny permission

per.imageRequestDecision("test", true, account2, { from: account1 })

per.allowedImagesForPatron.call(account2, { from: account2 })


* [ ] image info (by hash) for owner, number of requests, etc
