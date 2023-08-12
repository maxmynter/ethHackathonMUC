// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ILinkedUp.sol";
import "./IOffer.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract LinkedUp is ILinkedUp, Ownable {

    address payable public VAULT;  // the address to which match proposal fees are sent to
    uint256 public MIN_MATCH_PROPOSAL_FEE;  // the minimum amount matchmakers have to put at stake when proposing matches
    uint256 public MIN_OFFER_BOUNTY;  // the minimum amount needed to be offered as a bounty for successful matches

    constructor (address payable _vault, uint256 _proposalFee, uint256 _bounty) {
        VAULT = _vault;
        emit VaultChanged(address(0), _vault, owner());
        MIN_MATCH_PROPOSAL_FEE = _proposalFee;
        emit MinimumMatchProposalFeeChanged(0, _proposalFee, owner());
        MIN_OFFER_BOUNTY = _bounty;
        emit MinimumOfferBountyChanged(0, _bounty, owner());
    }

    function changeVaultAddress(address payable _vault) onlyOwner public {
        require(_vault != address(0), "Zero address");
        address old = VAULT;
        VAULT = _vault;
        emit VaultChanged(old, _vault, msg.sender);
    }

    function changeMinimumMatchProposalFee(uint256 _fee) onlyOwner public {
        require(_fee > 0, "Fee cannot be zero");
        require(_fee <= MIN_OFFER_BOUNTY, "Minimum fee cannot be smaller than minimum bounty");
        uint256 old = MIN_MATCH_PROPOSAL_FEE;
        MIN_MATCH_PROPOSAL_FEE = _fee;
        emit MinimumMatchProposalFeeChanged(old, _fee, owner());
    }

    function changeMinimumOfferBounty(uint256 _bounty) onlyOwner public {
        require(_bounty >= MIN_MATCH_PROPOSAL_FEE, "Minimum bounty cannot be smaller than match proposal fee");
        uint256 old = MIN_OFFER_BOUNTY;
        MIN_OFFER_BOUNTY = _bounty;
        emit MinimumOfferBountyChanged(old, _bounty, owner());
    }

    receive() payable external {}
}
