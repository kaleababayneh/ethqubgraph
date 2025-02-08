"use client";
import React, { useEffect, useState } from 'react';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import EqubDetailEach from "../equbdetaileach/page";

const EqubDetail = () => {
    const { data: equbList } = useScaffoldReadContract({
        contractName: "EthqubFactory",
        functionName: "getDeployedContracts",
        watch: true,
    });

    const isArray = Array.isArray(equbList);

    return (
        <div>
            <h1>Equb Detail</h1>
            {isArray ? (
                <EqubDetailEach equbDetails={equbList} /> 
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EqubDetail;