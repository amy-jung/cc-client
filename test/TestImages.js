var Images = artifacts.require("./Images.sol");

contract('Images', function(accounts) {

  it("should instantiate", function() {
    return Images.deployed().then(function(instance) {
      imageInstance = instance;

      return imageInstance.hello.call();
    }).then(function(resp) {
      assert.equal(resp, "hello", "The user was not signed up.");
    });
  });

  // it("should instantiate", function() {
  //   return Images.deployed().then(function(instance) {
  //     imageInstance = instance;
  //
  //     return imageInstance.createNewImage('0xHashThing', true, {from: accounts[0]});
  //   }).then(function() {
  //     return imageInstance.public_images.call();
  //   }).then(function(images) {
  //     assert.equal(images, "something", "The user was not signed up.");
  //   });
  // });

})
