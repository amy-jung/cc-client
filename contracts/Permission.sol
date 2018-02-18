pragma solidity ^0.4.18;

import './zeppelin/ownership/RBAC.sol';
import './Authentication.sol';
import './Images.sol';

contract Permission is RBAC, Authentication, Images {

  event ImageRequested(address imageOwner, bytes32 ipfsHash);
  event ImageApproved(address imageRequester, bytes32 ipfsHash);
  event ImageDenied(address imageRequester, bytes32 ipfsHash);

  mapping (address => PermissionStatus[]) public permissionStatuses;

  struct PermissionStatus {
    address requester;
    Image image;
    bool status;
  }

  function getPermissionStatus(address requester, bytes32 _ipfsHash) returns (bool) {
    uint i = 0;
    Image storage getImage = hashToImage[_ipfsHash];
    for (i; i<permissionStatuses[requester].length; i++) {
      Image tempImage = permissionStatuses[requester][i].image;
      if (tempImage.ipfsHash == getImage.ipfsHash) {
        return permissionStatuses[requester][i].status;
      }
    return false;
    }
  }

  function getPermissionStatusObject(address requester, bytes32 _ipfsHash) returns (PermissionStatus) {
    uint i = 0;
    Image storage getImage = hashToImage[_ipfsHash];
    for (i; i<permissionStatuses[requester].length; i++) {
      Image tempImage = permissionStatuses[requester][i].image;
      if (tempImage.ipfsHash == getImage.ipfsHash) {
        return permissionStatuses[requester][i];
      }
    }
  }

  // A Patron will request to use a certain image, triggering event for Creator
  function requestImageUse(bytes32 _ipfsHash) {
    addRole(msg.sender, ROLE_PATRON);

    Image requestedImage = hashToImage[_ipfsHash];
    permissionStatuses[msg.sender].push(PermissionStatus(msg.sender, requestedImage, false));
    ImageRequested(hashToImage[_ipfsHash].owner, _ipfsHash);
  }

  function imageRequestDecision(bytes32 _ipfsHash, bool decision, address requester) onlyCreator returns (bool) {
    require (hashToImage[_ipfsHash].owner == msg.sender );

    if (decision) {
      PermissionStatus memory tempStatus = getPermissionStatusObject(requester, _ipfsHash);
        
      tempStatus.status = true;
      patronPermittedImages[requester].push(_ipfsHash);
      hashToImage[_ipfsHash].allowedUsers.push(requester);
      ImageApproved(requester, _ipfsHash);
      return true;
    } else {
      ImageDenied(requester, _ipfsHash);
    }
  }

}
