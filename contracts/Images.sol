pragma solidity ^0.4.18;

import './zeppelin/ownership/RBAC.sol';
import './Authentication.sol';

contract Images is RBAC, Authentication {

  // ROLE BASED ACCESS CONTROL ///

  // there are two roles within our Dapp, plus admin in the Zeppelin contract
  string public constant ROLE_CREATOR = "creator"; // someone who owns an image
  string public constant ROLE_PATRON = "patron"; // someone who wants to use an image

  modifier onlyCreatorOrPatron() {
    require(
      hasRole(msg.sender, ROLE_CREATOR) || hasRole(msg.sender, ROLE_PATRON)
    );
    _;
  }

  modifier onlyCreator() {
    require(hasRole(msg.sender, ROLE_CREATOR));
    _;
  }

  modifier onlyPatron() {
    require(hasRole(msg.sender, ROLE_PATRON));
    _;
  }

  // EVENTS WHICH WE MUST LISTEN FOR //
  event ImageRequested(address _addr, string _ipfs_hash);
  event ImageUploaded(address _addr, string _ipfs_hash);


  // IMAGE INFORMATION STORAGE LAYER //
  struct Image {
    address owner;
    string ipfs_hash;
    bool is_public;
    address[] allowed_users;
  }

  // access the image by who uploaded it
  mapping (address => Image[]) private address_to_images;
  // access the image by its ipfs hash
  mapping (string => Image) private hash_to_image;

  Image[] public public_images;
  Image[] private all_images;

  function numberOfImages() returns (uint) {
    return all_images.length;
  }

  // just for testing right now
  string public hello;

  // constructor just for test purposes
  function Images() {
    addRole(msg.sender, ROLE_CREATOR);
    addRole(msg.sender, ROLE_PATRON);
    addRole(msg.sender, ROLE_ADMIN);
    hello = "hello. it works.";
  }

  function createNewImage(string _ipfs_hash, bool _is_public) returns (bool) {
    address[] memory empty_array; // at first, no one is authorized
    Image memory new_image = Image(msg.sender, _ipfs_hash, _is_public, empty_array);

    all_images.push(new_image);
    address_to_images[msg.sender].push(new_image);
    hash_to_image[_ipfs_hash] = new_image;
    ImageUploaded(msg.sender, _ipfs_hash);
    addRole(msg.sender, ROLE_CREATOR);

    // only if image is public, add it to public images
    if (_is_public) {
      public_images.push(new_image);
      return true;
    }

    // TODO case check for when image cannot be created
    return true;
  }

  // allow the CREATOR to change whether an image is public
  function editImage(string _ipfs_hash, bool _is_public) onlyCreator returns (bool) {
    require (hash_to_image[_ipfs_hash].owner == msg.sender );
    hash_to_image[_ipfs_hash].is_public = _is_public;
  }

  // A Patron will request to use a certain image, triggering event for Creator
  function requestImageUse(string _ipfs_hash) {
    addRole(msg.sender, ROLE_PATRON);
    ImageRequested(hash_to_image[_ipfs_hash].owner, _ipfs_hash);
  }

  function allowImageRequest(string _ipfs_hash, bool decision, address requestor) onlyCreator returns (bool) {
    require (hash_to_image[_ipfs_hash].owner == msg.sender );
    hash_to_image[_ipfs_hash].allowed_users.push(requestor);
    return true;
  }


  // This can't be done at all I think
  function imagesForAddress(address _address) private returns (Image[]) {
    return address_to_images[_address];
  }

  function imageForHash(string _hash) private returns (Image) {
    return hash_to_image[_hash];
  }

}
