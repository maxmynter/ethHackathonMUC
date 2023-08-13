// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ILinkedUp.sol";
import "./IOffer.sol";
import "./Offer.sol";
import "./Applicant.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract LinkedUp is ILinkedUp, Ownable {

    address payable public VAULT;  // the address to which match proposal fees are sent to
    uint256 public MIN_MATCH_PROPOSAL_FEE;  // the minimum amount matchmakers have to put at stake when proposing matches
    uint256 public MIN_OFFER_BOUNTY;  // the minimum amount needed to be offered as a bounty for successful matches
    uint256 public MIN_DURATION = 1 hours;  // The minimum duration an offer has to last
    uint256 public MAX_DURATION = 365 days;  // The maximum duration an offer can last

    mapping(address => address) public deployerOfApplicant;  // Returns the address owning the applicant smart contract with the specified address
    address[] public offers;  // A list of all offers. Zeros indicate closed/resolved offers
    mapping(address => uint256[]) offersOf;  // Maps an address to all offers posted by the account

    constructor (address payable _vault, uint256 _proposalFee, uint256 _bounty) {
        VAULT = _vault;
        emit VaultChanged(address(0), _vault, owner());
        MIN_MATCH_PROPOSAL_FEE = _proposalFee;
        emit MinimumMatchProposalFeeChanged(0, _proposalFee, owner());
        MIN_OFFER_BOUNTY = _bounty;
        emit MinimumOfferBountyChanged(0, _bounty, owner());
    }

    function createApplicantProfile() public returns (address) {
        Applicant applicant = new Applicant();
        deployerOfApplicant[address(applicant)] = msg.sender;
        emit ApplicantProfileCreation(msg.sender, address(applicant));
        return address(applicant);
    }

    function createApplicantProfileWithData(bytes32[] calldata _data) public returns (address) {
        IApplicant applicant = IApplicant(createApplicantProfile());
        applicant.addData(_data);
        return address(applicant);
    }

    function numberOfOffers() external view returns (uint256) {
        return offers.length;
    }

    function createOffer(bytes32 _data, uint256 _bounty, uint256 _minBet, uint16 _nWinners, uint256 _duration) public payable returns (address) {
        require(_duration >= MIN_DURATION && _duration <= MAX_DURATION, "Duration is out of bounds");
        require(msg.value == _bounty, "msg.value != bounty");
        // The rest of the parameters are validated in Offer.sol
        Offer offer = new Offer{value: msg.value}(address(this), _data, _bounty, _minBet, _nWinners, block.timestamp + _duration);
        offersOf[msg.sender].push(offers.length);
        offers.push(address(offer));
        emit OfferCreation(msg.sender, address(offer), _bounty, _minBet, _nWinners, _duration);
        return address(offer);
    }

    function deleteOffer(uint256 offer) public {
        require(offer < offers.length, "Invalid offer index");
        require(offers[offer] != address(0), "Offer was already removed");
        require(IOffer(offers[offer]).isClosed(), "Offer is still open");
        offers[offer] = address(0);
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
