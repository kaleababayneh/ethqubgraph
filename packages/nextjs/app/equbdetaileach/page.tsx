"use client";
import React from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

interface EqubDetailEachGenProps {
  equbDetails: string[];
}

const EqubDetailEachGen: React.FC<EqubDetailEachGenProps> = ({ equbDetails }) => {

  const detailsData = equbDetails.map((address: string) => {
    const { data, isLoading, error } = useScaffoldReadContract({
      contractName: "EthqubFactory",
      functionName: "getEthqubDetails",
      args: [address],
      watch: true,
    });
    return { data, isLoading, error, address };
  });

  return (
    <div>
       {detailsData.map((item, index) => (

        // <Detail key={index} equbDetail={item} />
        <div> {item.toString()} </div>
      ))} 
    </div>
  );
};

export default EqubDetailEachGen;
