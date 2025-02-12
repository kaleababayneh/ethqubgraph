import React from 'react'
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import Join from '../join/page';


interface EqubDetailEachProps {
    equbDetails: string[];
  }
  

const JoinWrapper = () => {

    const { data: equbList } = useScaffoldReadContract({
        contractName: "EthqubFactory",
        functionName: "getDeployedContracts",
        watch: true,
    });

    const isArray = Array.isArray(equbList);


  return (
    <>
        {isArray ? (
                <Join equbDetails={equbList} /> 
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

export default JoinWrapper;