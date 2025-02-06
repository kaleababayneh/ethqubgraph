//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

error Raffle__UpkeepNotNeeded(uint256 currentBalance, uint256 numPlayers, uint256 raffleState);

contract Raffle is VRFConsumerBaseV2, AutomationCompatibleInterface {
    // types 

    enum RaffleState { OPEN, CALCULATING }

    // state variable

    uint256 immutable entranceFee;
    address payable[] public players;
    VRFCoordinatorV2Interface private immutable vrfCoordinator;
    bytes32 immutable private gasLane;
    uint256 immutable private subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable callbackGasLimit;
    uint32 private constant NUM_WORDS = 1; 

    // Lottery state variables
    address private recentWinner;
    RaffleState private raffleState;
    uint256 private lastTimeStamp;  
    uint256 private immutable interval;

    event RaffleEnter(address indexed player);
    event RequestRaffleWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);

    constructor(
        address _vrfCoordinator, 
        uint256 _entranceFee,
        bytes32 _gasLane,
        uint256 _subscriptionId,
        uint32 _callbackGasLimit,
        uint256 _interval
        )  VRFConsumerBaseV2(_vrfCoordinator) {
        entranceFee = _entranceFee;
        vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        gasLane = _gasLane;
        subscriptionId = _subscriptionId;
        callbackGasLimit = _callbackGasLimit;
        raffleState = RaffleState.OPEN;
        lastTimeStamp = block.timestamp;
        interval = _interval;
    }

    function enterRaffle() public payable {
        require(msg.value > entranceFee, "");
        require(raffleState == RaffleState.OPEN, "");
        players.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }

    function checkUpkeep(bytes memory /*checkData*/) public  override returns (bool upkeepNeeded, bytes memory /* performData */ ){
       bool isOpen = raffleState == RaffleState.OPEN;
       bool timePassed = (block.timestamp - lastTimeStamp) > interval;
       bool hasPlayers = players.length > 0;
       bool hasBalance = address(this).balance > 0;
       upkeepNeeded = (isOpen && timePassed && hasPlayers && hasBalance);

    }

    function performUpkeep(bytes calldata /* performData */ ) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        if (!upkeepNeeded) {
            revert Raffle__UpkeepNotNeeded(address(this).balance, players.length, uint256(raffleState));
        }
        raffleState = RaffleState.CALCULATING;
        uint256 requestId = vrfCoordinator.requestRandomWords(
            gasLane,
            subscriptionId,
            REQUEST_CONFIRMATIONS,
            callbackGasLimit,
            NUM_WORDS
        );

        emit RequestRaffleWinner(requestId);
    }

    function getRandomNumber() public  returns (uint256) {
        return vrfCoordinator.requestRandomWords(
            gasLane,
            subscriptionId,
            REQUEST_CONFIRMATIONS,
            callbackGasLimit,
            NUM_WORDS
        );
    }

    function fulfillRandomWords(uint256 /** request id */, uint256[] memory randomWords) internal override {

       uint256 indexOfWinner = randomWords[0] % players.length;
       address payable _recentWinner = players[indexOfWinner];
       recentWinner = _recentWinner;
       raffleState = RaffleState.OPEN;
       players = new address payable[](0);
       lastTimeStamp = block.timestamp;
       (bool success, ) = _recentWinner.call{value: address(this).balance}("");
        require(success, "Failed to send money to winner");

        emit WinnerPicked(_recentWinner);
    }

    function getEntranceFee() public view returns (uint256) {
        return entranceFee;
    }

    function getPlayers(uint256 index) public view returns (address) {
        return players[index];
    }

    function getRecentWinner() public view returns (address) {
        return recentWinner;
    }

    function getRaffleState() public view returns (RaffleState) {
        return raffleState;
    }

    function getNumWords () public pure returns (uint32) {
        return NUM_WORDS;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return players.length;
    }

    function getLastTimeStamp() public view returns (uint256) {
        return lastTimeStamp;
    }

    function getReqConfirmations() public pure returns (uint16) {
        return REQUEST_CONFIRMATIONS;
    }
}