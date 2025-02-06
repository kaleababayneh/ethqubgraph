"use client"
import React from 'react'
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

const Equbs = () => {
    const { data: equbLists } = useScaffoldReadContract({
         contractName: "EthqubFactory",
         functionName: "getDeployedContracts",
    });

    console.log(equbLists);

    return (
        <div>
            <h1>Deployed Equbs</h1>
            {equbLists && equbLists.length > 0 ? (
                <ul>
                    {equbLists.map((equb: string, index: number) => (
                        <li key={index}>{equb}</li>
                    ))}
                </ul>
            ) : (
                <p>No Equbs deployed yet.</p>
            )}
        </div>
    );
}

export default Equbs;