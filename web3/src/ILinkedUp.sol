// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ILinkedUp {

    event VaultChanged(address indexed _from, address indexed _to, address indexed by);
    event MinimumMatchProposalFeeChanged(uint256 _from, uint256 _to, address indexed by);
    event MinimumOfferBountyChanged(uint256 _from, uint256 _to, address indexed by);

    function VAULT() external view returns (address payable VAULT);
    function MIN_MATCH_PROPOSAL_FEE() external view returns (uint256);
    function MIN_OFFER_BOUNTY() external view returns (uint256);
    function MIN_DURATION() external view returns (uint256);
    function MAX_DURATION() external view returns (uint256);
    
    function deployerOfApplicant(address applicant) external view returns (address);

    function createApplicantProfile() external returns (address);
    function createApplicantProfileWithData(bytes32[] calldata _data) external returns (address);
    function createOffer(bytes32 _data, uint256 _bounty, uint256 _minBet, uint16 _nWinners, uint256 _duration) external returns (address);

    function changeVaultAddress(address payable _vault) external;
    function changeMinimumMatchProposalFee(uint256 _fee) external;
    function changeMinimumOfferBounty(uint256 _bounty) external;
}