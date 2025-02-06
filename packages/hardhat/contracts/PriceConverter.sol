//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {

    uint256 public constant TOKEN_DECIMALS = 10**18;
    

    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
       (,int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    } 

    function getConversioRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethAmount * ethPrice)/TOKEN_DECIMALS;
        return ethAmountInUsd;  
    }
}