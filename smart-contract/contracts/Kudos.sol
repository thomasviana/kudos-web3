// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

// Import ERC1155 token contract from Openzeppelin

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Kudos is ERC1155Supply, Ownable {
    string private _baseUri = "ipfs://bafybeihnu54qrkuw2nb3o6mfzgutqdfwi2zbbtjeuxepzh5skupundxyga/";
    string private _baseExtension = ".json";
    string public name = "More Than Kudos";
    string public symbol = "MTK";
    uint256 public supply = 3; // Initial supply
    mapping(uint256 => string) private _uris;

    event SendMessage(address from, address receiver, string message, uint256 timestamp);
  
    struct KudosStruct {
        address sender;
        address receiver;
        string message;
        uint256 timestamp;
        uint256 tokenId;
    }

    KudosStruct[] kudos;

    constructor() ERC1155(_baseUri) {
        _mint(msg.sender, 1, 1, "");
        _mint(msg.sender, 2, 1, "");
        _mint(msg.sender, 3, 1, "");
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(string(abi.encodePacked(_baseUri, Strings.toString(tokenId),_baseExtension))
        );
    }

    function sendKudos(address payable receiver, uint256 tokenId, string memory message ) public {
        kudos.push(KudosStruct(msg.sender, receiver, message, block.timestamp, tokenId));
        require(msg.sender != receiver);
        _mint(receiver, tokenId, 1, "");
        supply++;

        emit SendMessage(msg.sender, receiver, message, block.timestamp);
    }

    function getAllKudos() public view returns (KudosStruct[] memory) {
        return kudos;
    }

    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender == account);
        _burn(account, id, amount);
        supply--;
    } 
}