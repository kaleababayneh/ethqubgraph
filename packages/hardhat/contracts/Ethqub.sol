//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PriceConverter.sol";

// I am building a community pool saving
contract Ethqub {
    using PriceConverter for uint256;
    // constant
    address public constant ETH_USD_ADDRESS =  0x694AA1769357215DE4FAC081bf1f309aDC325306;

    uint256 private constant TOKEN_DECIMALS = 10**18;

    // state variables
    address public immutable creator;

    string public equbTitle;
    uint256 public immutable creationTime = block.timestamp;
    uint256 public startingTime ;
    uint256 public cycleStartTime;
    uint256 public lastTimeStamp;
    
    uint256 public poolAmount;
    uint256 public individualContribution;

    uint256 public currentCycle;
    uint256 public totalCycles;
    uint256 public cycleDuration;

    address[] public members;
    address[] public luckyWinners;
    address[] public currentMembers; 

    uint256[] public numberOfCyclesDuePaid;

    address public luckyWinner;  
    uint256 public randomNumber;
    string public ipfsHash;

    uint256 public creditScore;
    
    // events
    event MemberJoined(address indexed member, uint256 contribution);
    event MemberWithdrawn(address indexed member, uint256 amount);
    event MemberPaid(address indexed member, uint256 amount);
    event WinnerPicked(address indexed winner);
    event EqubEnded(address indexed winner);


    struct PaidDue {
        address member;
        uint256 amount;
    }
    
    uint256 public ethPrice;
    AggregatorV3Interface internal priceFeed; 

    modifier isLuckyWinner() {
        require(msg.sender == luckyWinner, "Not the lucky winner");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == creator, "Only the creator can call this function");
        _;
    }

    constructor(    
                address _creator,
                string memory _equbTitle, 
                uint256 _poolAmount,  
                uint256 _totalCycles, 
                uint256 _cycleDuration, 
                string memory _ipfsHash, 
                uint256 _startingTime, 
                uint256 /*_creditScore*/, 
                address /*priceFeedAddress*/
        ) {
        creator = _creator;
        equbTitle = _equbTitle;
        poolAmount = _poolAmount;
        individualContribution = _poolAmount / _totalCycles;
        totalCycles = _totalCycles;
        cycleDuration = _cycleDuration;
        startingTime = _startingTime;
        cycleStartTime = _startingTime;
        //creditScore = _creditScore;
        currentCycle = 0;
        members.push(_creator);
        currentMembers.push(msg.sender);
        numberOfCyclesDuePaid[0] += 1;
        ipfsHash = _ipfsHash;
    }

    function getMemberIndex(address member) public view returns (uint256) {
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == member) {
                return i;
            }
        }
        return 10e18;
    }

    function getBalance(address _account) public view returns (uint256) {
        return _account.balance;
    }


   
    function joinEqub() public payable {

        require(members.length < totalCycles, "Equb is full");
        require(getBalance(msg.sender) >= individualContribution, "Insufficient balance");
        require(numberOfCyclesDuePaid[getMemberIndex(msg.sender)] == 10e18, "Already a member");
        require(msg.value == individualContribution, "Incorrect contribution amount");

        // send the individual contribution to the contract

        members.push(msg.sender);
        currentMembers.push(msg.sender);
        numberOfCyclesDuePaid[getMemberIndex(msg.sender)] += 1;
        emit MemberJoined(msg.sender, individualContribution);
    }

    function payEqubDue () public payable {

        require(numberOfCyclesDuePaid[getMemberIndex(msg.sender)] != 0, "Not a member");
        require(numberOfCyclesDuePaid[getMemberIndex(msg.sender)] <= currentCycle, "Already paid for this cycle");
        require(currentCycle < totalCycles, "Equb has ended");
        require(msg.value == individualContribution, "Incorrect contribution amount");

       

        // Increase the number of cycles due paid for the payer
        numberOfCyclesDuePaid[getMemberIndex(msg.sender)] += 1;

        // add one to the number of cycles due paid for the payer
        // send the individual contribution to the contract


        // emit: keyword used to trigger an event
        emit MemberPaid(msg.sender, individualContribution);
    }

    function seePrice() public  returns (uint256) {
        ethPrice = PriceConverter.getPrice(priceFeed);
        return ethPrice;
    }

    function getRandomNumber() public returns (uint256) {
        // currentCycle++
        randomNumber = uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            block.timestamp,
            msg.sender,
            currentCycle,
            gasleft()
        )));

        return randomNumber  % currentMembers.length;
    }

    function withdrawEqub() public isLuckyWinner() {
        require(startingTime != 0, "Equb not started yet");
        require(block.timestamp >=   cycleDuration, "Cycle not ended yet");
        uint256 balance = address(this).balance;
       uint256 withdrawableAmount = individualContribution * members.length;

        if (balance > withdrawableAmount) {
            balance = withdrawableAmount;
        }

        address winner = luckyWinner;
        luckyWinners.push(winner);
        luckyWinner = address(0);

        (bool success, ) = winner.call{ value: balance }("");
        require(success, "Failed to send Ether");

        emit MemberWithdrawn(winner, balance);

        // Emit event if Equb ends
        if (currentCycle == totalCycles) {
            emit EqubEnded(winner);
        }
    }


    function pickLuckyWinner() public onlyOwner(){
       require(block.timestamp >= lastTimeStamp + cycleDuration, "Cycle not ended yet");
       uint256 indexOfWinner = getRandomNumber();
       luckyWinner = currentMembers[indexOfWinner];
       lastTimeStamp = block.timestamp;

        if (currentMembers.length > 1) {
            currentMembers[indexOfWinner] = currentMembers[currentMembers.length - 1];
        }
    
        currentMembers.pop();
        currentCycle++;

        emit WinnerPicked(luckyWinner);
    }

    function equbDetails() public view returns (string memory, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, string memory, address, address[] memory, address[] memory, address[] memory, uint256[] memory) {
        return (
            equbTitle, 
            creationTime, 
            startingTime, 
            cycleStartTime, 
            lastTimeStamp, 
            poolAmount, 
            individualContribution, 
            currentCycle, 
            totalCycles, 
            cycleDuration, 
            members.length, 
            ipfsHash,
            creator,
            currentMembers,
            members,
            luckyWinners,
            numberOfCyclesDuePaid
        );
    }

    function isMember(address userAddress) public view returns (bool) {


        for (uint i = 0; i < members.length; i++) {
            if (members[i] == userAddress) {
                return true;
            }
        }
        return false;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
    
}
