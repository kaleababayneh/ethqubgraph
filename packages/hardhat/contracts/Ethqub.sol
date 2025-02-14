//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "./PriceConverter.sol";

contract Ethqub {
    uint CYCLE_TO_SECONDS = 60 * 60 * 24; 

    using PriceConverter for uint256;
    address public constant ETH_USD_ADDRESS =  0x694AA1769357215DE4FAC081bf1f309aDC325306;
    uint256 private constant TOKEN_DECIMALS = 10**18;

    uint256 public ethPrice;
    AggregatorV3Interface internal priceFeed; 

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



    modifier isLuckyWinner(address _luckyWinner) {
        require(_luckyWinner == luckyWinner, "Not the lucky winner");
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
        ) payable {
        creator = _creator;
        equbTitle = _equbTitle;
        poolAmount = _poolAmount;
        individualContribution = _poolAmount / _totalCycles;
        totalCycles = _totalCycles;
        cycleDuration = _cycleDuration;
        startingTime = _startingTime;
        cycleStartTime = _startingTime;
        currentCycle = 0;
        ipfsHash = _ipfsHash;
        //creditScore = _creditScore;

        members.push(_creator);
        currentMembers.push(_creator);
        numberOfCyclesDuePaid.push(1);
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

   
    function joinEqub(address _joiner) public payable {
        require(members.length < totalCycles, "Equb is full");
        require(getBalance(_joiner) >= individualContribution, "Insufficient balance");
        require(getMemberIndex(_joiner) == 10e18, "Already a member");

        members.push(_joiner);
        currentMembers.push(_joiner);
        numberOfCyclesDuePaid.push(1);

        emit MemberJoined(_joiner, individualContribution);
    }

    function payEqubDue (address _payer) public payable {

        require(getMemberIndex(_payer) < totalCycles, "Not a member");
        require(numberOfCyclesDuePaid[getMemberIndex(_payer)] <= currentCycle, "Already paid for this cycle");
        require(currentCycle < totalCycles, "Equb has ended");

        numberOfCyclesDuePaid[getMemberIndex(_payer)] += 1;
        emit MemberPaid(_payer, individualContribution);
    }


    function getRandomNumber() public view returns (uint256) {
        require(block.timestamp >= startingTime + currentCycle * cycleDuration * CYCLE_TO_SECONDS, "Cycle not ended yet");
        return  uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            block.timestamp,
            msg.sender,
            currentCycle,
            gasleft()
        )))  % currentMembers.length;
    }


    function withdrawEqub() public {
       require(block.timestamp >= startingTime + currentCycle * cycleDuration * CYCLE_TO_SECONDS, "Cycle not ended yet");
       uint256 balance = address(this).balance;
       uint256 withdrawableAmount = individualContribution * members.length;

        if (balance > withdrawableAmount) {
            balance = withdrawableAmount;
        }

        address winner = pickLuckyWinner();
        luckyWinners.push(winner);
        luckyWinner = address(0);

        (bool success, ) = payable(winner).call{value: balance, gas: 30000}("");
        require(success, "Failed to send Ether");

        emit MemberWithdrawn(winner, balance);
        currentCycle++;
        cycleStartTime = startingTime + currentCycle * cycleDuration * CYCLE_TO_SECONDS;

        if (currentCycle == totalCycles) {
            emit EqubEnded(winner);
        }
    }


    function pickLuckyWinner() public  returns (address) {
       require(block.timestamp >= startingTime + currentCycle * cycleDuration * CYCLE_TO_SECONDS, "Cycle not ended yet");
       uint256 indexOfWinner = getRandomNumber();

       luckyWinner = currentMembers[indexOfWinner];
       lastTimeStamp = block.timestamp;

        if (currentMembers.length > 1) {
            currentMembers[indexOfWinner] = currentMembers[currentMembers.length - 1];
        }
    
        currentMembers.pop();
        currentCycle++;

        emit WinnerPicked(luckyWinner);
        return luckyWinner;
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

    function getCycle() public view returns (uint256) {
        require(block.timestamp >= startingTime + currentCycle * cycleDuration, "Cycle not ended yet");
        return currentCycle;
    }

    function seePrice() public  returns (uint256) {
        ethPrice = PriceConverter.getPrice(priceFeed);
        return ethPrice;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
    
}
