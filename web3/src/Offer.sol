// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ILinkedUp.sol";
import "./IOffer.sol";
import "./IApplicant.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract Offer is IOffer, Ownable {

    ILinkedUp factory;
    uint256 public bounty;  // The amount of ether successful matchmakers receive in wei
    uint256 public minBet;  // The minimum amount of ether required for a bet in wei
    uint256 public expirationTime;  // The block timestap after whih the offer expires/closes
    uint16 public numberOfWinners;  // The amount of applicants the poster of the offer is going to select
    bytes32 public data;  // A hash of the data of the offer description
    bool reclaimed;  // true if no match was posted and the poster reclaimed their bounty
    
    address[] proposed;  // A list of all proposed applicants
    mapping(address => MatchData) public matchDataOf;  // Data (total shares, total ether, etc.) for a specific applicant
    mapping(address => mapping(address => uint256)) public bets;  // Maps matchmakers to a map of applicants and the matchmakers' stakes on them
    address[] winners;  // The applicants selected by the offer poster

    // Parameters for the calculation of the share prices (currently a simple constant product function like in an AMM)
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

        // Calculate the amount of shares the sender receives for the ether attached to the message
        uint256 shares = calculateShares(matchDataOf[applicant].totalShares, matchDataOf[applicant].etherValue, msg.value);
        require(shares >= minShares, "Slippage control");  // avoid frontrunning
        uint256 etherValue = msg.value;

        // Check whether this is the first time the applicant is proposed as a match for the offer
        if (matchDataOf[applicant].totalShares == 0) {
            proposed.push(applicant);
            // TODO: Integrate PUSH Protocol
        }
        // Update the total amount of shares and ether bet on the applicant
        matchDataOf[applicant].totalShares += shares;
        matchDataOf[applicant].etherValue += etherValue;
        bets[msg.sender][applicant] += shares;

        // Consider adding some part of the bet to the bounty
        (bool res,) = factory.VAULT().call{value: etherValue}("");
        require(res);
        emit Bet(applicant, address(this), msg.sender, shares, etherValue);
    }

    function calculateShares(uint256 totalShares, uint256 totalEther, uint256 etherIn) public view returns (uint256 shares) {
        // A simple constant product formula X * Y = K = const
        shares = ((MAX_SHARES - totalShares) * etherIn) / (INITIAL_X + totalEther + etherIn);
    }

    function totalSharesOf(address applicant) external view returns (uint256 totalShares) {
        totalShares = matchDataOf[applicant].totalShares;
    }

    function etherValueOf(address applicant) external view returns (uint256 etherValue) {
        etherValue = matchDataOf[applicant].etherValue;
    }
    function sharesOwnedOf(address matchmaker, address applicant) external view returns (uint256 shares) {
        shares = bets[matchmaker][applicant];
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
        emit OfferAccepted(address(this), applicant);
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
        emit Match(address(this), applicant);
        // TODO: Inform both parties of the match via PUSH Protocol
    }

    function reclaimBounty(address payable receiver) onlyOwner _isClosed public {
        require(!reclaimed, "Bounty has already been withdrawn");
        require(proposed.length == 0, "Bounties can only be reclaimed when there are no proposed matches.");
        reclaimed = true;
        (bool res,) = receiver.call{value: bounty}("");
        require(res);
        emit Reclaim(address(this), bounty);
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
        emit Claim(address(this), msg.sender, applicant, payout);
    }

    function isClosed() public view returns (bool) {
        return (expirationTime <= block.timestamp) || winners.length == numberOfWinners;
    }

    receive() external payable{}
}