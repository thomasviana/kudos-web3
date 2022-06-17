// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

// Import ERC1155 token contract from Openzeppelin

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Kudos is ERC1155Supply, Ownable {
    string private _baseUri;
    string private _baseExtension = ".json";
    string public name = "More Than Kudos";
    string public symbol = "MTK";
    uint256 public supply = 0;
    mapping(uint256 => string) private _uris;

    event SendMessage(address from, address receiver, string message, uint256 timestamp);
  
    struct KudosStruct {
        address sender;
        address receiver;
        string message;
        uint256 timestamp;
    }

    KudosStruct[] kudos;

    constructor(string memory _initBaseURI) ERC1155(_initBaseURI) {
        _baseUri = _initBaseURI;
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(string(abi.encodePacked(_baseUri, Strings.toString(tokenId),_baseExtension))
        );
    }

    function sendKudo(address payable receiver, uint256 tokenId, string memory message ) public {
        kudos.push(KudosStruct(msg.sender, receiver, message, block.timestamp));
        require(msg.sender != receiver);
        _mint(receiver, tokenId, 1, "");
        supply++;

        emit SendMessage(msg.sender, receiver, message, block.timestamp);
    }

    function getAllkudos() public view returns (KudosStruct[] memory) {
        return kudos;
    }

    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender == account);
        _burn(account, id, amount);
        supply--;
    } 
}