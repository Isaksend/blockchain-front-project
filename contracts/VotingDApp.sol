// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingDApp {
    struct Poll {
        uint id;
        string title;
        string description;
        address creator;
        uint voteCount;
    }

    mapping(uint => Poll) public polls;
    mapping(uint => mapping(address => bool)) public hasVoted;
    uint public pollCount;

    event PollCreated(uint pollId, string title, string description, address creator);
    event VoteCasted(uint pollId, address voter);

    function createPoll(string memory _title, string memory _description) public {
        pollCount++;
        polls[pollCount] = Poll(pollCount, _title, _description, msg.sender, 0);
        emit PollCreated(pollCount, _title, _description, msg.sender);
    }

    function vote(uint _pollId) public {
        require(_pollId > 0 && _pollId <= pollCount, "Poll does not exist");
        require(!hasVoted[_pollId][msg.sender], "You have already voted");

        hasVoted[_pollId][msg.sender] = true;
        polls[_pollId].voteCount++;
        emit VoteCasted(_pollId, msg.sender);
    }

    function fundPoll(uint _pollId) public payable {
        require(msg.value > 0, "You must send ETH");
        require(_pollId > 0 && _pollId <= pollCount, "Poll does not exist");
    }

    function getPoll(uint _pollId) public view returns (Poll memory) {
        require(_pollId > 0 && _pollId <= pollCount, "Poll does not exist");
        return polls[_pollId];
    }
}
