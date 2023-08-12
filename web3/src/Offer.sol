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
    
    IApplicant[] proposed;
    mapping(address => MatchData) public matchDataOf;
    mapping(address => mapping(address => uint256)) public bets;
    address[] winners;

    uint256 INITIAL_X = 50;
    uint256 MAX_SHARES = 1_000_000;
    uint256 K;

    modifier isOpen() {
        require(expirationTime > block.timestamp, "Offer already closed");
        _;
    }

    modifier isClosed() {
        require((expirationTime <= block.timestamp) || winners.length == numberOfWinners, "Offer still open");
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
        K = MAX_SHARES * _minBet;
    }

    function buyShares(address applicant, uint256 shares) isOpen payable public {
        require(factory.ownerOfApplicant(applicant) != address(0), "Applicant is not registered with the factory");
        require(!(matchDataOf[applicant].applicantAck && matchDataOf[applicant].posterAck), "Can't bet on applicants who where already selected for the offer");
        require(shares > 0, "Shares cannot be zero");
        uint256 price = calculateSharesPrice(matchDataOf[applicant], shares);
        require(price >= msg.value, "Insufficient funds");
        matchDataOf[applicant].totalShares += shares;
        matchDataOf[applicant].etherValue += price;
        bets[msg.sender][applicant] += shares;
        // TODO: Integrate PUSH Protocol

        // TODO: Consider adding some part of the bet to the bounty
        (bool res,) = factory.VAULT().call{value: price}("");
        require(res);

        // Return the leftover funds
        // TODO: Check whether this is secure
        (res,) = payable(msg.sender).call{value: msg.value - price}("");
        require(res);
    }

    function calculateSharesPrice(MatchData memory matchData, uint256 amount) public view returns (uint256 price) {
        // TODO: Think of a nice formula
        price = amount * minBet;
    }

    function selectApplicant(address applicant) onlyOwner isOpen public {
        require(factory.ownerOfApplicant(applicant) != address(0), "Applicant isn't registered");
        require(!matchDataOf[applicant].posterAck, "Applicant was already selected");
        matchDataOf[applicant].posterAck = true;
        checkMatch(applicant);
    }

    function acceptOffer(address applicant) isOpen public {
        require(factory.ownerOfApplicant(applicant) != address(0), "Applicant is not registered");
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

    function reclaimBounty(address payable receiver) onlyOwner isClosed public {
        require(!reclaimed, "Bounty has already been withdrawn");
        require(proposed.length == 0, "Bounties can only be reclaimed when there are no proposed matches.");
        reclaimed = true;
        (bool res,) = receiver.call{value: bounty}("");
        require(res);
    }

    function claimBounty(address payable receiver, address applicant) isClosed public {
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

}