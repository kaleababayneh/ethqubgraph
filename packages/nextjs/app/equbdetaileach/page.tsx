"use client";
import React from "react";
import EqubCard from "~~/components/custom/EqubCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

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
  console.log(detailsData);
  return (
    <div className="equb-detail-wrapper">
      {detailsData.map((item, index) => {

        const [
          equbTitle
          ,// creationTime, 
          ,startingTime
          ,// cycleStartTime, 
          ,// lastTimeStamp, 
          , poolAmount
          ,// individualContribution, 
          , currentCycle
          , totalCycles 
          ,// cycleDuration, 
          , numberOfMembers
          , ipfsHash
          ,// creator

        ] = item.data || [];

        return (
          <a href={`/equbdetail/${item.address}`}>
          <div key={index} className="equb-detail-each">
            <EqubCard
              equbTitle={equbTitle?.toString()}
              startingTime={Number(startingTime)}
              poolAmount={Number(poolAmount)}
              currentCycle={Number(currentCycle)}
              totalCycles={Number(totalCycles)}
              numberOfMembers={Number(numberOfMembers)}
              ipfsHash={ipfsHash}
              // Add other props as needed based on your contract's return tuple structure
            />
          </div>
          </a>
        );
      })}
    </div>
  );
};

export default EqubDetailEach;