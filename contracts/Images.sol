pragma solidity ^0.4.18;

import './zeppelin/ownership/RBAC.sol';
import './Authentication.sol';

contract Images is RBAC, Authentication {

  // ROLE BASED ACCESS CONTROL ///

  // there are two roles within our Dapp, plus admin in the Zeppelin contract
  string public constant ROLE_CREATOR = "creator"; // someone who owns an image
  string public constant ROLE_PATRON = "patron"; // someone who wants to use an image

  // meaning only folks with accounts created can call functions
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
  event ImageUploaded(address imageOwner, bytes32 ipfsHash);

  // IMAGE INFORMATION STORAGE LAYER //
  struct Image {
    bool exists;
    address owner;
    bytes32 ipfsHash;
    bool isPublic;
    address[] allowedUsers;
    bytes32 tag;
    uint numberOfRequests;
  }

  // DATA WE MUST ACCESS //
  // 1. addresses of all public images
  bytes32[] public publicImages;

  function allImages() returns (bytes32[]) {
    return publicImages;
  }

  // 2. all images for a CREATOR
  mapping (address => bytes32[]) public creatorsPublicImages;

  function imagesForCreator(address _addr) returns (bytes32[]) {
    return creatorsPublicImages[_addr];
  }

  // 3. all images a PATRON can use
  mapping (address => bytes32[]) public patronPermittedImages;

  function allowedImagesForPatron(address _addr) returns ( bytes32[]) {
    return patronPermittedImages[_addr];
  }

  // 4. all tags mapped to images
  mapping (bytes32 => bytes32[]) public tagToImages;

  function imagesForTag(bytes32 tag) returns ( bytes32[]) {
    return tagToImages[tag];
  }

  // INTERNAL ACCESS POINTS //
  mapping (address => Image[]) private creatorAddressToImages;
  // access the image by its ipfs hash
  mapping (bytes32 => Image) public hashToImage;


  function numberOfImages() returns (uint) {
    return publicImages.length;
  }

  // constructor function with all the needed roles
  function Images() {
    addRole(msg.sender, ROLE_CREATOR);
    addRole(msg.sender, ROLE_PATRON);
    addRole(msg.sender, ROLE_ADMIN);
  }

  function createNewImage(bytes32 _ipfsHash, bool _isPublic, bytes32 _tag) returns (bool) {
    if (hashToImage[_ipfsHash].exists) {
      return false;
    }

    address[] storage emptyArray; // at first, no one is authorized

    creatorAddressToImages[msg.sender].push(Image(true, msg.sender, _ipfsHash, _isPublic, emptyArray, _tag, 0));
    hashToImage[_ipfsHash] = Image(true, msg.sender, _ipfsHash, _isPublic, emptyArray, _tag, 0);
    tagToImages[_tag].push(_ipfsHash);
    ImageUploaded(msg.sender, _ipfsHash);
    addRole(msg.sender, ROLE_CREATOR);

    // only if image is public, add it to public images
    if (_isPublic) {
      publicImages.push(_ipfsHash);
      creatorsPublicImages[msg.sender].push(_ipfsHash);
      return true;
    }

    // TODO case check for when image cannot be created?
    return true;
  }

  // allow the CREATOR to change whether an image is public
  function editImage(bytes32 _ipfsHash, bool isPublic) onlyCreator returns (bool) {
    require (hashToImage[_ipfsHash].owner == msg.sender );
    hashToImage[_ipfsHash].isPublic = isPublic;
  }



  // This can't be done at all I think
  /* function imagesForAddress(address _address) public returns (bytes32[]) {
    return creatorAddressToImages[_address].ipfsHash;
  } */

}
