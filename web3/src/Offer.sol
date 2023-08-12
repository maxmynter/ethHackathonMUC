// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ILinkedUp.sol";
import "./IOffer.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract Offer is IOffer, Ownable {

    ILinkedUp factory;
    uint256 bounty;

    constructor(address _factory) {
        factory = ILinkedUp(_factory);
    }
}