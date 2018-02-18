pragma solidity ^0.4.18;

import './Images.sol';

contract Permission is Images {

  event ImageRequested(address imageOwner, bytes32 ipfsHash, string message);
  event ImageApproved(address imageRequester, bytes32 ipfsHash);
  event ImageDenied(address imageRequester, bytes32 ipfsHash);

  mapping (address => PermissionStatus[]) public permissionStatuses;

  struct PermissionStatus {
    address requester;
    bytes32 imageHash;
    string message;
    bool status;
  }

  function numberOfPermissions(address _addr) returns (uint) {
    return permissionStatuses[_addr].length;
  }

  function getPermissionStatus(address requester, bytes32 _ipfsHash) returns (bool) {
    uint i = 0;
    for (i; i<permissionStatuses[requester].length; i++) {
      bytes32 hsh = permissionStatuses[requester][i].imageHash;
      if (hsh == _ipfsHash) {
        return permissionStatuses[requester][i].status;
      }
    return false;
    }
  }

  // A Patron will request to use a certain image, triggering event for Creator
  function requestImageUse(bytes32 _ipfsHash, string _message) {
    permissionStatuses[msg.sender].push(PermissionStatus(msg.sender, _ipfsHash, _message, false));
    ImageRequested(hashToImage[_ipfsHash].owner, _ipfsHash, _message);
  }

  function imageRequestDecision(bytes32 _ipfsHash, bool _decision, address _requester) returns (bool) {
    /* require (hashToImage[_ipfsHash].owner == msg.sender); */

    if (_decision == true) {
      // actually write decision change
      for (uint i = 0; i < permissionStatuses[_requester].length; i++) {
        if (permissionStatuses[_requester][i].imageHash == _ipfsHash) {
          permissionStatuses[_requester][i].status = _decision;
        }
      // update the places to access this information
      patronPermittedImages[_requester].push(_ipfsHash);
      hashToImage[_ipfsHash].allowedUsers.push(_requester);
      hashToImage[_ipfsHash].numberOfRequests = hashToImage[_ipfsHash].numberOfRequests + 1;
      ImageApproved(_requester, _ipfsHash);
      return true;
      }
    } else {
      ImageDenied(_requester, _ipfsHash);
      return false;
    }
  }
}
