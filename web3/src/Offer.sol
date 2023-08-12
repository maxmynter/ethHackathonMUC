// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ILinkedUp.sol";
import "./IOffer.sol";
import "./IApplicant.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract Offer is IOffer, Ownable {

    ILinkedUp factory;
    uint256 public bounty;
    uint256 public minBet;
    uint256 public expirationTime;
    uint16 public numberOfWinners;
    bytes32 public data;
    bool reclaimed;
    
    address[] proposed;
    mapping(address => MatchData) public matchDataOf;
    mapping(address => mapping(address => uint256)) public bets;
    address[] winners;

    uint256 INITIAL_X;
    uint256 MAX_SHARES = 1_000_000;
    uint256 K;

    modifier _isOpen() {
        require(!isClosed(), "Offer already closed");
        _;
    }

    modifier _isClosed() {
        require(isClosed(), "Offer still open");
        _;
    }

    constructor(address _factory, bytes32 _data, uint256 _bounty, uint256 _minBet, uint16 _nWinners, uint256 _expirationTime) payable {
        factory = ILinkedUp(_factory);
        require((_bounty >= factory.MIN_OFFER_BOUNTY() && _bounty >= _minBet), "Bounty is too low");
        require(_minBet > factory.MIN_MATCH_PROPOSAL_FEE(), "Minimum bet is too low");
        require(expirationTime > block.timestamp, "Expiration time has to be in the future");
        require(_nWinners > 0, "Must select at least one applicant");
        require(data != 0, "Data hash cannot be zero");

        bounty = _bounty;
        minBet = _minBet;
        numberOfWinners = _nWinners;
        expirationTime = _expirationTime;
        data = _data;
        reclaimed = false;

        INITIAL_X = _minBet;
        K = MAX_SHARES * INITIAL_X;
    }

    function buyShares(address applicant, uint256 minShares) _isOpen payable public {
        require(factory.deployerOfApplicant(applicant) != address(0), "Applicant is not registered with the factory");
        require(!(matchDataOf[applicant].applicantAck && matchDataOf[applicant].posterAck), "Can't bet on applicants who where already selected for the offer");
        require(minShares > 0, "minShares cannot be zero");
        uint256 shares = calculateShares(matchDataOf[applicant], msg.value);
        require(shares >= minShares, "Slippage control");
        if (matchDataOf[applicant].totalShares == 0) {
            proposed.push(applicant);
            // TODO: Integrate PUSH Protocol
        }
        matchDataOf[applicant].totalShares += shares;
        matchDataOf[applicant].etherValue += msg.value;
        bets[msg.sender][applicant] += shares;

        // TODO: Consider adding some part of the bet to the bounty
        (bool res,) = factory.VAULT().call{value: msg.value}("");
        require(res);
    }

    function calculateShares(MatchData memory matchData, uint256 etherIn) public view returns (uint256 shares) {
        // TODO: Come up with a nicer formula
        shares = ((MAX_SHARES - matchData.totalShares) * etherIn) / (INITIAL_X + matchData.etherValue + etherIn);
    }

    function selectApplicant(address applicant) onlyOwner _isOpen public {
        require(factory.deployerOfApplicant(applicant) != address(0), "Applicant isn't registered");
        require(!matchDataOf[applicant].posterAck, "Applicant was already selected");
        matchDataOf[applicant].posterAck = true;
        checkMatch(applicant);
    }

    function acceptOffer(address applicant) _isOpen public {
        require(factory.deployerOfApplicant(applicant) != address(0), "Applicant is not registered");
        require(Ownable(applicant).owner() == msg.sender, "Only the applicant can accept an offer.");
        require(!matchDataOf[applicant].applicantAck, "Offer was already accepted");
        matchDataOf[applicant].applicantAck = true;
        checkMatch(applicant);
    }

    function checkMatch(address applicant) internal {
        if (!matchDataOf[applicant].posterAck || !matchDataOf[applicant].applicantAck) {
            return;
        }
        // a bit inefficient
        for (uint i = 0; i < winners.length; i++) {
            if (winners[i] == applicant) {
                return;
            }
        }
        winners.push(applicant);
        // TODO: Inform both parties of the match via PUSH Protocol
    }

    function reclaimBounty(address payable receiver) onlyOwner _isClosed public {
        require(!reclaimed, "Bounty has already been withdrawn");
        require(proposed.length == 0, "Bounties can only be reclaimed when there are no proposed matches.");
        reclaimed = true;
        (bool res,) = receiver.call{value: bounty}("");
        require(res);
    }

    function claimBounty(address payable receiver, address applicant) _isClosed public {
        require(winners.length > 0, "No applicant has been selected.");  // TODO: Handle this case
        require(matchDataOf[applicant].applicantAck && matchDataOf[applicant].posterAck, "Applicant hasn't been select.");
        uint256 shares = bets[msg.sender][applicant];
        require(shares > 0, "Sender owns no shares");
        uint256 payout = (matchDataOf[applicant].etherValue * shares * bounty) / (matchDataOf[applicant].totalShares * winners.length);
        require(payout > 0, "Payout is zero");
        bets[msg.sender][applicant] = 0;
        (bool res,) = receiver.call{value: payout}("");
        require(res);
    }

    function isClosed() public view returns (bool) {
        return (expirationTime <= block.timestamp) || winners.length == numberOfWinners;
    }

}