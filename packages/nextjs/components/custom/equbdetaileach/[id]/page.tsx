"use client";
import React from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import Detail from '~~/components/custom/detail/[id]/page';

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



  if (!detailsData) {
    return <div>Loading...</div>;
  }

  if (detailsData.length === 0) {
    return <div>No data</div>;
  }


  return (
    <div   className='custom-equb-detail'>
      {detailsData.map((item, index) => (
        <Detail key={index} equbDetail={item} />
      ))}
    </div>
  );
};

export default EqubDetailEach;
