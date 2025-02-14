//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "./Ethqub.sol";

contract EthqubFactory {

    Ethqub[] public ethqubArray;
    mapping(address => Ethqub) public ethqubMapping; // Store address to contract mapping

    event EthqubCreated(address indexed contractAddress, address indexed creator);

    function createEthqub(
        address _creator, 
        string memory _equbTitle, 
        uint256 _poolAmount, 
        uint256 _totalCycles, 
        uint256 _cycleDuration,
        string memory _ipfsHash, 
        uint256 _startingTime, 
        uint256 _creditScore, 
        address priceFeedAddress
    ) public payable returns (address) {
        Ethqub ethqub = new Ethqub{value: msg.value}(_creator, _equbTitle, _poolAmount, _totalCycles, _cycleDuration, _ipfsHash, _startingTime, _creditScore, priceFeedAddress);
        ethqubArray.push(ethqub);
        ethqubMapping[address(ethqub)] = ethqub;
        emit EthqubCreated(address(ethqub), _creator);
        return address(ethqub);
    }

    function getEthqubDetails(address contractAddress) public view returns (
        string memory, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256,
        string memory,
        address,
        address[] memory,
        address[] memory,
        address[] memory,
        uint256[] memory
    ) {
        require(address(ethqubMapping[contractAddress]) != address(0), "Contract does not exist");
        
        Ethqub ethqubInstance = Ethqub(payable(contractAddress)); 
        return ethqubInstance.equbDetails();
    }
    
    function getDeployedContracts() public view returns (Ethqub[] memory) {
        return ethqubArray;
    }

    function joinEthqub(address contractAddress, address _joiner) public payable {
        require(address(ethqubMapping[contractAddress]) != address(0), "Contract does not exist");
        Ethqub ethqubInstance = Ethqub(payable(contractAddress)); 
        ethqubInstance.joinEqub{value: msg.value}(_joiner);
    }

    function withdrawEthqub(address contractAddress) public payable {
        require(address(ethqubMapping[contractAddress]) != address(0), "Contract does not exist");
        Ethqub ethqubInstance = Ethqub(payable(contractAddress)); 
        ethqubInstance.withdrawEqub();
    }

    function getCycle(address contractAddress) public  returns (uint256) {
        require(address(ethqubMapping[contractAddress]) != address(0), "Contract does not exist");
        Ethqub ethqubInstance = Ethqub(payable(contractAddress)); 
        return ethqubInstance.getCycle();
    }



}