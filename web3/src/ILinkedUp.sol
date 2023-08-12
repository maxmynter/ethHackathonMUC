// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ILinkedUp {

    event VaultChanged(address indexed _from, address indexed _to, address indexed by);
    event MinimumMatchProposalFeeChanged(uint256 _from, uint256 _to, address indexed by);
    event MinimumOfferBountyChanged(uint256 _from, uint256 _to, address indexed by);

    function VAULT() external returns (address payable VAULT);

    function changeVaultAddress(address payable _vault) external;
    function changeMinimumMatchProposalFee(uint256 _fee) external;
    function changeMinimumOfferBounty(uint256 _bounty) external;
}