// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ILinkedUp.sol";
import "./IOffer.sol";
import "./IApplicant.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract Offer is IOffer, Ownable {

    ILinkedUp factory;
    uint256 bounty;
    uint256 minBet;
    uint256 expirationTime;
    bool reclaimed;
    
    IApplicant[] proposed;
    mapping(address => uint256) public totalShares;
    mapping(address => mapping(address => uint256)) public bets;

    modifier isOpen() {
        require(expirationTime > block.timestamp, "Offer already closed");
        _;
    }

    modifier isClosed() {
        require(expirationTime <= block.timestamp, "Offer still open");
        _;
    }

    constructor(address _factory, uint256 _bounty, uint256 _minBet, uint256 _expirationTime) payable {
        factory = ILinkedUp(_factory);
        bounty = _bounty;
        minBet = _minBet;
        require(expirationTime > block.timestamp, "Expiration time has to be in the future");
        expirationTime = _expirationTime;
        reclaimed = false;
    }

    function buyShares(address applicant, uint256 shares) isOpen payable public {
        // TODO: validate applicant
        require(shares > 0, "Shares cannot be zero");
        uint256 price = calculateSharesPrice(totalShares[applicant], shares);
        require(price >= msg.value, "Insufficient funds");
        totalShares[applicant] = totalShares[applicant] + shares;
        // TODO: PUSH
        bets[msg.sender][applicant] = bets[msg.sender][applicant] + shares;

        // TODO: Consider adding some part of the bet to the bounty
        (bool res,) = factory.VAULT().call{value: price}("");
        require(res);

        // Return the leftover funds
        // TODO: Rethink this
        (res,) = payable(msg.sender).call{value: msg.value - price}("");
        require(res);
    }

    function calculateSharesPrice(uint256 currentTotal, uint256 amount) public view returns (uint256 price) {
        // TODO: Think of a nice formula
        price = amount * minBet;
    }

    function reclaimBounty(address payable receiver) onlyOwner isClosed public {
        require(!reclaimed, "Bounty has already been withdrawn");
        require(proposed.length == 0, "Bounties can only be reclaimed when there are no proposed matches.");
        reclaimed = true;
        (bool res,) = receiver.call{value: bounty}("");
        require(res);
    }

}