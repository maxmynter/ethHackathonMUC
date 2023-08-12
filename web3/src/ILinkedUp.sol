// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ILinkedUp {

    event VaultChanged(address indexed _from, address indexed _to, address indexed by);
    event MinimumMatchProposalFeeChanged(uint256 _from, uint256 _to, address indexed by);
    event MinimumOfferBountyChanged(uint256 _from, uint256 _to, address indexed by);
    event ApplicantProfileCreation(address indexed deployer, address indexed applicantProfile);
    event OfferCreation(address indexed poster, address indexed offer, uint256 bounty, uint256 minBet, uint16 numberOfWinners, uint256 duration);

    function VAULT() external view returns (address payable VAULT);
    function MIN_MATCH_PROPOSAL_FEE() external view returns (uint256);
    function MIN_OFFER_BOUNTY() external view returns (uint256);
    function MIN_DURATION() external view returns (uint256);
    function MAX_DURATION() external view returns (uint256);
    
    function deployerOfApplicant(address applicant) external view returns (address);
    function offers(uint256 index) external view returns (address);

    function numberOfOffers() external view returns (uint256);

    // Creates a new applicant profile (a smart contract)
    function createApplicantProfile() external returns (address);
    // Creates a new applicant profile and also adds the hashes of some files to the profile
    function createApplicantProfileWithData(bytes32[] calldata _data) external returns (address);
    // Creates a new offer with the specified bounty (in wei), minimum Bet for proposing a match, the number of applications to be selected and the duration until the offer closes
    function createOffer(bytes32 _data, uint256 _bounty, uint256 _minBet, uint16 _nWinners, uint256 _duration) external payable returns (address);

    function changeVaultAddress(address payable _vault) external;
    function changeMinimumMatchProposalFee(uint256 _fee) external;
    function changeMinimumOfferBounty(uint256 _bounty) external;
}