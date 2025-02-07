"use client";
import React from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import EqubDetailEachEvery from '../equbdetaileachevery/page'; // Uncomment if needed

interface EqubDetailEachProps {
  equbDetails: string[];
}

const EqubDetailEach: React.FC<EqubDetailEachProps> = ({ equbDetails }) => {

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
        <EqubDetailEachEvery key={index} equbDetail={item} />
      ))}
    </div>
  );
};

export default EqubDetailEach;
