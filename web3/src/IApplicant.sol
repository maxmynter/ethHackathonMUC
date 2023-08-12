// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IApplicant {

    event DataAdded(address indexed applicant, bytes32[] dataHashes);
    event DataInvalidated(address indexed applicant, bytes32[] dataHashes);

    function isData(bytes32 dataHash) external returns (bool);
    function addData(bytes32[] calldata _data) external;
    function invalidateData(bytes32[] calldata _data) external;
}