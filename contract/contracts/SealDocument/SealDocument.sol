// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract SealDocument is Initializable {
    event SealedDocument(
        address indexed owner,
        string fileName,
        string fileHash
    );

    function initialize() public initializer {}

    function commitDocument(
        address owner,
        string calldata fileName,
        string calldata fileHash
    ) external {
        emit SealedDocument(owner, fileName, fileHash);
    }
}
