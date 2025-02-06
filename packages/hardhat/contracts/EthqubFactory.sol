//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Ethqub.sol";


contract EthqubFactory {

    Ethqub[] public ethqubArray;

    function createEthqub(address _creator, string memory _equbTitle, uint256 _poolAmount, uint256 _totalCycles, uint256 _cycleDuration,address priceFeedAddress) public {
        Ethqub ethqub = new Ethqub(_creator, _equbTitle, _poolAmount, _totalCycles, _cycleDuration, priceFeedAddress);
        ethqubArray.push(ethqub);
    }

    function ethqubGet(uint256 _yourContractIndex) public view returns (Ethqub) {
        Ethqub ethqub = ethqubArray[_yourContractIndex];
        return ethqub;
    }

    function getDeployedContracts() public view returns (Ethqub[] memory)  {
        return ethqubArray;
    }
}