"use client"
import React from 'react'
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import JoinWrap from '~~/components/custom/joinwrap/page';



const Join = () => {

    const { data: equbList } = useScaffoldReadContract({
        contractName: "EthqubFactory",
        functionName: "getDeployedContracts",
        watch: true,
    });

    const isArray = Array.isArray(equbList);

    // reverse the equbList array please


    const reversedEqubList = isArray ? equbList.slice().reverse() : [];


  return (
    <>
        {isArray ? (
                <JoinWrap equbDetails={reversedEqubList} /> 
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}>
                </div>
            )}
        </>
  )
}

export default Join;