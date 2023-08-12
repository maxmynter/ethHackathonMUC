// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./IApplicant.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract Applicant is IApplicant, Ownable {

    // TODO: could be optimized for gas usage
    mapping(bytes32 => bool) public isData;

    function addData(bytes32[] calldata _data) onlyOwner public {
        // Warning: unbounded gas consumption
        for (uint i = 0; i < _data.length; i++) {
            isData[_data[i]] = true;
        }
    }

    function invalidateData(bytes32[] calldata _data) onlyOwner public {
        // Warning: unbounded gas consumption
        for (uint i = 0; i < _data.length; i++) {
            isData[_data[i]] = false;
        }
    }
}