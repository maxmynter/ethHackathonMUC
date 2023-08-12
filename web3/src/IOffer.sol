// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface IOffer {

    struct MatchData {
        bool applicantAck;  // whether the applicant accepted the offer
        bool posterAck;  // whether the job poster accepted the offer
        uint256 totalShares;  // the total amount of shares/bets on this match owned by matchmakers
        uint256 etherValue;  // the total amount of ether in wei bet on this match
    }

    event Bet(address indexed applicant, address indexed offer, address indexed buyer, uint256 shares, uint256 etherValue);
    event Reclaim(address indexed offer, uint256 bounty);
    event Claim(address indexed offer, address indexed matchmaker, address indexed applicant, uint256 amount);
    event OfferAccepted(address indexed offer, address indexed applicant);
    event ApplicantSelection(address indexed offer, address indexed applicant);
    event Match(address indexed offer, address indexed applicant);

    function totalSharesOf(address applicant) external view returns (uint256 totalShares);
    function etherValueOf(address applicant) external view returns (uint256 etherValue);
    function sharesOwnedOf(address matchmaker, address applicant) external view returns (uint256 shares);

    // Buys shares / bets on the specified applicant with the amount of ether attached to the function call
    // reverts if it doesn't buy at least minShares shares
    function buyShares(address applicant, uint256 minShares) payable external;
    // Calculates the amount of shares that can be bought with etherIn ether in wei, when totalShares shares and totalEther ether are bet on the match
    function calculateShares(uint256 totalShares, uint256 totalEther, uint256 etherIn) external view returns (uint256 shares);
    // Allows the offer poster to reclaim their bounty if the offer closes without anyone proposing a match
    function reclaimBounty(address payable receiver) external;
    // Can only be called by the poster of the offer and accepts an applicant/match
    function selectApplicant(address applicant) external;
    // Called by the applicant if they accept the match
    function acceptOffer(address applicant) external;
    // Allows matchmakers to claim their share of the bounry for the match with the specified applicant if it was successful
    function claimBounty(address payable receiver, address applicant) external;
    function isClosed() external view returns (bool);
}