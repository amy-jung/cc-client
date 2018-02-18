pragma solidity ^0.4.18;

/* import './zeppelin/ownership/RBAC.sol';
import './Authentication.sol'; */

contract Images {

  // EVENTS WHICH WE MUST LISTEN FOR //
  event ImageUploaded(address imageOwner, bytes32 ipfsHash);

  // TODO modifier onlyImageOwner(hash)

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
  mapping (address => bytes32[]) private creatorsPrivateImages;

  function publicImagesForCreator(address _addr) public returns (bytes32[]) {
    return creatorsPublicImages[_addr];
  }

  function privateImagesForCreator(address _addr) returns (bytes32[]) {
    require( msg.sender == _addr );
    return creatorsPrivateImages[_addr];
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

  // 5. Count of Permissions
  function imageRequestCount(bytes32 _ipfsHash) returns (uint) {
    return hashToImage[_ipfsHash].numberOfRequests;
  }

  // INTERNAL ACCESS POINTS //
  mapping (address => Image[]) private creatorAddressToImages;
  // access the image by its ipfs hash
  mapping (bytes32 => Image) public hashToImage;


  function numberOfImages() returns (uint) {
    return publicImages.length;
  }

  string public hello;

  // constructor function with all the needed roles
  function Images() {
    hello = "hello. this contract works.";
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

    // only if image is public, add it to public images
    if (_isPublic) {
      publicImages.push(_ipfsHash);
      creatorsPublicImages[msg.sender].push(_ipfsHash);
      return true;
    } else {
      creatorsPrivateImages[msg.sender].push(_ipfsHash);
      return true;
    }
    return true;
  }

  // allow the CREATOR to change whether an image is public
  function editImageIsPublic(bytes32 _ipfsHash, bool isPublic) returns (bool) {
    require (hashToImage[_ipfsHash].owner == msg.sender );
    Image storage thatImage = hashToImage[_ipfsHash];

    // case where it was private and is now public
    if (isPublic) {
      publicImages.push(_ipfsHash);
      creatorsPublicImages[msg.sender].push(_ipfsHash);
      return isPublic;
    }
  }
}
