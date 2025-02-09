"use client";
import React, { useEffect, useState } from 'react';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import EqubDetailEachGen from '~~/app/equbdetaileach/page';

const EqubDetail = () => {
    const { data: equbList } = useScaffoldReadContract({
        contractName: "EthqubFactory",
        functionName: "getDeployedContracts",
        watch: true,
    });

    const isArray = Array.isArray(equbList);

    return (
        <>
            {isArray ? (
                <EqubDetailEachGen equbDetails={equbList} /> 
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default EqubDetail;