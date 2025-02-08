"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useParams } from "next/navigation";
import Detail from '~~/app/detail/page';

interface EqubDetailInfo {
  data: any;
  isLoading: boolean;
  error: any;
  address: any;
}

const EqubDetailPage = () => {

  const params = useParams();
  const contractaddress = params?.id; // Ensuring params exist

  const { data, isLoading, error } = useScaffoldReadContract({
    contractName: "EthqubFactory",
    functionName: "getEthqubDetails",
    args: [Array.isArray(contractaddress) ? contractaddress[0] : contractaddress],
    watch: true,
  });

  if (!data) {
    return <p>Loading...</p>;
  }


  const equbDetailInfo: EqubDetailInfo = { 
    data: data,
    isLoading: isLoading,
    error: error,
    address: contractaddress
  }

  return (
    <div>
        <Detail key={0} equbDetail={equbDetailInfo} /> 
    </div>
  );
};

export default EqubDetailPage;