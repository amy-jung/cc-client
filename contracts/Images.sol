pragma solidity ^0.4.18;

/* import './zeppelin/ownership/Ownable.sol'; */

/* contract Images is Ownable{ */
contract Images {

  event ImageRequested(address _addr, string _ipfs_hash);
  event ImageUploaded(address _addr, string _ipfs_hash);

  struct Image {
    address owner;
    string ipfs_hash;
    bool is_public;
  }

  mapping (address => Image) private address_to_image;
  mapping (string => Image) private hash_to_image;
  Image[] public public_images;
  Image[] private all_images;
  string public hello;

  // constructor just for test purposes
  function Images() {
    hello = "hello";
  }

  function createNewImage(string _ipfs_hash, bool _is_public) returns (bool) {
    Image memory new_image = Image({
      owner: msg.sender,
      ipfs_hash: _ipfs_hash,
      is_public: _is_public
    });

    all_images.push(new_image);
    address_to_image[msg.sender] = new_image;
    hash_to_image[_ipfs_hash] = new_image;
    ImageUploaded(msg.sender, _ipfs_hash);

    // only if image is public, add it to public images
    if (_is_public) {
      public_images.push(new_image);
      return true;
    }
  }

  function imageForAddress(address _address) returns (Image) {
    return address_to_image[_address];
  }

  function imageForHash(string _hash) returns (Image) {
    return hash_to_image[_hash];
  }

  // a user requests permission to use an image

}
