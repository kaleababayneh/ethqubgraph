import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, ethers } from "ethers";



const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)fjdofd
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const vrfCoordinatorV2 = "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B";
  const entranceFee = ethers.parseEther("0.01");
  const gasLane = "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae";
  const BASE_FEE = ethers.parseEther("0.25");
  const GAS_PRICE_LINK = 1e9;
  const subscriptionId = "14079749900429409589629844893152945182043081709445166555923161887859658288304";
  const callbackGasLimit = 500000;
  const interval = "30";
  
  // equb constructor arguments: address _creator,
  const equbTitle = "Equb Community Pool";
  const poolAmount = ethers.parseEther("0.1");
  const totalCycles = 2;
  const cycleDuration = 1 * 60;
  const priceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
  const mydeploy = "0x7db6AA7896C8b4C7D92D1649289e7984e14FF0eB";

  await deploy("EthqubFactory", {
    from: deployer,
    // Contract constructor arguments
    args: [
      /*
      mydeploy,
      equbTitle,
      poolAmount,
      totalCycles,
      cycleDuration,
      priceFeedAddress
      */
    ],
    log: true, 
  });

  // Get the deployed contract to interact with it after deploying.
  const yourContract = await hre.ethers.getContract<Contract>("EthqubFactory", deployer);
  //console.log("👋 Initial greeting:", await yourContract.greeting());
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["EthqubFactory"];

// args: [
//   deployer, // _creator
//   "Equb Community Pool", // _equbTitle
//   ethers.parseEther("0.1"), // _poolAmount (10 ETH)
//   10, // _totalCycles
//   30 * 24 * 60 * 60, // _cycleDuration (30 days in seconds)
//   "0x694AA1769357215DE4FAC081bf1f309aDC325306",
// ]