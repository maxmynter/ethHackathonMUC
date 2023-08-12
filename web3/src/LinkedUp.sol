// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract LinkedUp is Ownable {

    address payable VAULT;

    event VaultChanged(address indexed _from, address indexed _to, address indexed by);

    constructor (address payable _vault) {
        VAULT = _vault;
        emit VaultChanged(address(0), _vault, owner());
    }

    function changeVaultAddress(address payable _vault) onlyOwner public {
        require(_vault != address(0), "Zero address");
        address old = VAULT;
        VAULT = _vault;
        emit VaultChanged(old, _vault, msg.sender);
    }
}
