"use client";
import React from 'react';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import EqubCard from '~~/components/custom/EqubCard';
import { SyncLoader } from 'react-spinners';

// New props definition to accept filters
interface EqubDetailProps {
  equbDetails: string[];
  filters: {
    equbTitle: string;
    poolAmount: string;
    numberOfParticipants: string;
    contributionPerRound: string;
    poolDuration: string;
    minCreditScore: string;
  };
}

const passesFilters = (data: any[], filters: EqubDetailProps["filters"]) => {
    console.log(data);
  // Assume data[0] is equbTitle, data[5] is poolAmount, data[10] is numberOfParticipants, and data[9] is poolDuration.
  // Adjust these index mappings as per your contract details.
  if (filters.equbTitle && !data[0].toLowerCase().includes(filters.equbTitle.toLowerCase())) return false;
  if (filters.poolAmount && (data[5] + "") !== filters.poolAmount) return false;
  if (filters.numberOfParticipants && (data[10] + "") !== filters.numberOfParticipants) return false;
  // For contributionPerRound and minCreditScore adjust accordingly if these exist in data.
  if (filters.poolDuration && (data[9] + "") !== filters.poolDuration) return false;
  return true;
};

const EqubDetail: React.FC<EqubDetailProps> = ({ equbDetails, filters }) => {
    console.log(equbDetails);
  return (
    <>
      {equbDetails?.map((address: string, index: number) => {
        const { data, isLoading, error } = useScaffoldReadContract({
          contractName: "EthqubFactory",
          functionName: "getEthqubDetails",
          args: [address],
          watch: true,
        });

        if (isLoading) {
          return <div key={index}>
                <SyncLoader size={5} margin={5} color='rgb(232, 218, 255)'/>
          </div>;
        }
        if (error) {
          return <div key={index}>Error fetching data</div>;
        }
        // Only render if data exists and passes all filters.
        if (data && passesFilters([...data], filters)) {
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
      
              ] = data || [];
          return (
            <a key={index} href={`/equbdetail/${address}`}>
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
            </a>
          );
        }
        return null;
      })}
    </>
  );
};

export default EqubDetail;