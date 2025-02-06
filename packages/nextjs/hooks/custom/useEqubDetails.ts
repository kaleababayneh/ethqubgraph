import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

export const useEqubDetails = (address: string) => {
  return useScaffoldReadContract({
    contractName: "EthqubFactory",
    functionName: "getEthqubDetails",
    args: [address],
    watch: true,
  });
};