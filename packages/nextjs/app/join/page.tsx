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

  return (
    <>
        {isArray ? (
                <JoinWrap equbDetails={equbList} /> 
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