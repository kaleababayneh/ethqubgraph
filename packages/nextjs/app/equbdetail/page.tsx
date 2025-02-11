"use client";
import React from 'react';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import EqubDetailEachGen from '~~/app/equbdetaileach/page';
import { SyncLoader } from 'react-spinners';

const EqubDetail = () => {
    const { data: equbList } = useScaffoldReadContract({
        contractName: "EthqubFactory",
        functionName: "getDeployedContracts",
        watch: true,
    });

    const isArray = Array.isArray(equbList);

    console.log(equbList);

    return (
        <div className='custom-equb-detail'>
            {isArray ? (
                <EqubDetailEachGen equbDetails={equbList} /> 
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}>
                <SyncLoader size={20} margin={20} color='rgb(232, 218, 255)'/>
                </div>
            )}
        </div>
    );
};

export default EqubDetail;