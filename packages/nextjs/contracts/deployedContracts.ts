/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    EthqubFactory: {
      address: "0x9A676e781A523b5d0C0e43731313A708CB607508",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creator",
              type: "address",
            },
          ],
          name: "EthqubCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_creator",
              type: "address",
            },
            {
              internalType: "string",
              name: "_equbTitle",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_poolAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_totalCycles",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_cycleDuration",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_ipfsHash",
              type: "string",
            },
            {
              internalType: "address",
              name: "priceFeedAddress",
              type: "address",
            },
          ],
          name: "createEthqub",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "ethqubArray",
          outputs: [
            {
              internalType: "contract Ethqub",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "ethqubMapping",
          outputs: [
            {
              internalType: "contract Ethqub",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getDeployedContracts",
          outputs: [
            {
              internalType: "contract Ethqub[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
          ],
          name: "getEthqubDetails",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  11155111: {
    EthqubFactory: {
      address: "0x2ae4E54CFBC0Ef24BF6E2Dff2ffF710e99034572",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creator",
              type: "address",
            },
          ],
          name: "EthqubCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_creator",
              type: "address",
            },
            {
              internalType: "string",
              name: "_equbTitle",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_poolAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_totalCycles",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_cycleDuration",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "priceFeedAddress",
              type: "address",
            },
          ],
          name: "createEthqub",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "ethqubArray",
          outputs: [
            {
              internalType: "contract Ethqub",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "ethqubMapping",
          outputs: [
            {
              internalType: "contract Ethqub",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getDeployedContracts",
          outputs: [
            {
              internalType: "contract Ethqub[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
          ],
          name: "getEthqubDetails",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    Raffle: {
      address: "0x4A458f1c04bB80774Ec0F71a4d9616C74c399be3",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_vrfCoordinator",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_entranceFee",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "_gasLane",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "_subscriptionId",
              type: "uint256",
            },
            {
              internalType: "uint32",
              name: "_callbackGasLimit",
              type: "uint32",
            },
            {
              internalType: "uint256",
              name: "_interval",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "have",
              type: "address",
            },
            {
              internalType: "address",
              name: "want",
              type: "address",
            },
          ],
          name: "OnlyCoordinatorCanFulfill",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "currentBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "numPlayers",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "raffleState",
              type: "uint256",
            },
          ],
          name: "Raffle__UpkeepNotNeeded",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "RaffleEnter",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "requestId",
              type: "uint256",
            },
          ],
          name: "RequestRaffleWinner",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          name: "WinnerPicked",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "checkUpkeep",
          outputs: [
            {
              internalType: "bool",
              name: "upkeepNeeded",
              type: "bool",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "enterRaffle",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getEntranceFee",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getLastTimeStamp",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getNumWords",
          outputs: [
            {
              internalType: "uint32",
              name: "",
              type: "uint32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "getNumberOfPlayers",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "getPlayers",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRaffleState",
          outputs: [
            {
              internalType: "enum Raffle.RaffleState",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRandomNumber",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getRecentWinner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getReqConfirmations",
          outputs: [
            {
              internalType: "uint16",
              name: "",
              type: "uint16",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "performUpkeep",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "players",
          outputs: [
            {
              internalType: "address payable",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "requestId",
              type: "uint256",
            },
            {
              internalType: "uint256[]",
              name: "randomWords",
              type: "uint256[]",
            },
          ],
          name: "rawFulfillRandomWords",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        rawFulfillRandomWords:
          "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol",
        checkUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
        performUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
      },
    },
    YourContract: {
      address: "0x452A5e3d867894ebBa6cb5f10f3178dc61F275e1",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_vrfCoordinator",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_entranceFee",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "_gasLane",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "_subscriptionId",
              type: "uint256",
            },
            {
              internalType: "uint32",
              name: "_callbackGasLimit",
              type: "uint32",
            },
            {
              internalType: "uint256",
              name: "_interval",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "have",
              type: "address",
            },
            {
              internalType: "address",
              name: "want",
              type: "address",
            },
          ],
          name: "OnlyCoordinatorCanFulfill",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "currentBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "numPlayers",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "raffleState",
              type: "uint256",
            },
          ],
          name: "Raffle__UpkeepNotNeeded",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "RaffleEnter",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "requestId",
              type: "uint256",
            },
          ],
          name: "RequestRaffleWinner",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          name: "WinnerPicked",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "checkUpkeep",
          outputs: [
            {
              internalType: "bool",
              name: "upkeepNeeded",
              type: "bool",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "enterRaffle",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getEntranceFee",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getLastTimeStamp",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getNumWords",
          outputs: [
            {
              internalType: "uint32",
              name: "",
              type: "uint32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "getNumberOfPlayers",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "getPlayers",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRaffleState",
          outputs: [
            {
              internalType: "enum YourContract.RaffleState",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRandomNumber",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getRecentWinner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getReqConfirmations",
          outputs: [
            {
              internalType: "uint16",
              name: "",
              type: "uint16",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "performUpkeep",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "players",
          outputs: [
            {
              internalType: "address payable",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "requestId",
              type: "uint256",
            },
            {
              internalType: "uint256[]",
              name: "randomWords",
              type: "uint256[]",
            },
          ],
          name: "rawFulfillRandomWords",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        rawFulfillRandomWords:
          "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol",
        checkUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
        performUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
