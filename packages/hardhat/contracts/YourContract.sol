//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// I am building a community pool saving
contract YourContract {
    // constant

    uint256 public constant TOKEN_DECIMALS = 10**18;

    // state variables
    address public immutable creator;


    string public equbTitle;
    uint256 public immutable creationTime = block.timestamp;
    
    uint256 public poolAmount;
    uint256 public individualContribution;

    uint256 public currentCycle;
    uint256 public totalCycles;
    uint256 public cycleDuration;

    address[] public members;
    address[] public currentMembers;   

    
    constructor(address _creator, string memory _equbTitle, uint256 _poolAmount,  uint256 _totalCycles, uint256 _cycleDuration) {
        creator = _creator;
        equbTitle = _equbTitle;
        poolAmount = _poolAmount;
        individualContribution = _poolAmount / _totalCycles;
        totalCycles = _totalCycles;
        cycleDuration = _cycleDuration;
        currentCycle = 0;
    }

 
    modifier isOwner() {
        require(msg.sender == creator, "Not the Owner");
        _;
    }

    function getBalance(address _account) public view returns (uint256) {
        return _account.balance;
    }

   
    function joinEqub() public payable {

        require(members.length < totalCycles, "Equb is full");
        require(getBalance(msg.sender) >= individualContribution, "Insufficient balance");
        // send individual contribution to the contract
        (bool success, ) = address(this).call{value: individualContribution}("");
        require(success, "Failed to send Ether");

        members.push(msg.sender);

        // emit: keyword used to trigger an event
    }

    

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    // function withdraw() public isOwner {
    //     (bool success, ) = owner.call{ value: address(this).balance }("");
    //     require(success, "Failed to send Ether");
    // }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
