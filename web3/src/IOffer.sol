// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface IOffer {

    struct MatchData {
        bool applicantAck;
        bool posterAck;
        uint256 totalShares;
        uint256 etherValue;
    }

    //function matchDataOf(address applicant) external view returns (MatchData);
    //function bets(address matchmaker) external view returns (Match memory);
    function buyShares(address applicant, uint256 shares) payable external;
    function calculateShares(MatchData memory matchData, uint256 etherIn) external view returns (uint256 shares);
    function reclaimBounty(address payable receiver) external;
    function isClosed() external view returns (bool);
}