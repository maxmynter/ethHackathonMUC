// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface IOffer {

    function totalShares(address applicant) external view returns (uint256 shares);
    function bets(address matchmaker) external view returns (mapping(address => uint256));
    function buyShares(address applicant, uint256 shares) payable external;
    function calculateSharesPrice(uint256 currentTotal, uint256 amount) external view returns (uint256 price);
    function reclaimBounty(address payable receiver) external;
}