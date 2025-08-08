// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SealDocument is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    event SealedDocument(
        address indexed owner,
        string fileName,
        string fileHash
    );

    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);          // Required to initialize ownership
        __UUPSUpgradeable_init();  // Required to initialize UUPS storage
    }

    function commitDocument(
        address owner,
        string calldata fileName,
        string calldata fileHash
    ) external {
        emit SealedDocument(owner, fileName, fileHash);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
