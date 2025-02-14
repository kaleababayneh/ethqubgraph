"use client";
import React from 'react';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useParams } from "next/navigation";
import Detail from '~~/components/custom/detail/[id]/page';
import { SyncLoader } from 'react-spinners';

interface EqubDetailInfo {
  data: any;
  isLoading: boolean;
  error: any;
  address: any;
}

const EqubDetailPage = () => {

  const params = useParams();
  const contractaddress = params?.id; 

  const { data, isLoading, error } = useScaffoldReadContract({
    contractName: "EthqubFactory",
    functionName: "getEthqubDetails",
    args: [Array.isArray(contractaddress) ? contractaddress[0] : contractaddress],
    watch: true,
  });

  if (!data) {
    <SyncLoader size={20} margin={20} color='rgb(232, 218, 255)'/>
  }


  const equbDetailInfo: EqubDetailInfo = { 
    data: data,
    isLoading: isLoading,
    error: error,
    address: contractaddress
  }

  console.log("EQUB DETAIL",equbDetailInfo);
  return ( 
    <div className='custom-equb-detail'> 
        <Detail key={0} equbDetail={equbDetailInfo} /> 
    </div>
  );
};

export default EqubDetailPage;