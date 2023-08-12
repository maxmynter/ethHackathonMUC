// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface IOffer {

    struct MatchData {
        bool applicantAck;
        bool posterAck;
        uint256 totalShares;
        uint256 etherValue;
    }

    function totalSharesOf(address applicant) external view returns (uint256 totalShares);
    function etherValueOf(address applicant) external view returns (uint256 etherValue);
    function sharesOwnedOf(address matchmaker, address applicant) external view returns (uint256 shares);
    function buyShares(address applicant, uint256 shares) payable external;
    function calculateShares(uint256 totalShares, uint256 totalEther, uint256 etherIn) external view returns (uint256 shares);
    function reclaimBounty(address payable receiver) external;
    function selectApplicant(address applicant) external;
    function acceptOffer(address applicant) external;
    function claimBounty(address payable receiver, address applicant) external;
    function isClosed() external view returns (bool);
}