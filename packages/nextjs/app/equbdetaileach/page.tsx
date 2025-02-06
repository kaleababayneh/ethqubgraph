"use client";
import React from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
// import EqubDetailEachEvery from '../equbdetaileachevery/page'; // Uncomment if needed

interface EqubDetailEachProps {
  equbDetails: string[]; // Assuming each detail is an address (string)
}

const EqubDetailEach: React.FC<EqubDetailEachProps> = ({ equbDetails }) => {
  // For each address in equbDetails, we call the contract read hook.
  // (Make sure that equbDetails is a static list between renders.)
  const detailsData = equbDetails.map((address: string) => {
    const { data, isLoading, error } = useScaffoldReadContract({
      contractName: "EthqubFactory",
      functionName: "getEthqubDetails",
      args: [address],
      watch: true,
    });
    return { data, isLoading, error, address };
  });

  console.log("DETAILS DATA", detailsData);

  return (
    <div>
      {detailsData.map(({ data, isLoading, error, address }, index) => {
        if (isLoading)
          return (
            <p key={index}>
              Loading details for <strong>{address}</strong>...
            </p>
          );
        if (error)
          return (
            <p key={index}>
              Error loading details for <strong>{address}</strong>: {error.message}
            </p>
          );
        if (!data)
          return (
            <p key={index}>
              No details available for <strong>{address}</strong>
            </p>
          );

        // Assuming that data is an array with 11 items:
        const title = data[0];
        const creationTime = data[1];
        const startingTime = data[2];
        const cycleStartTime = data[3];
        const lastTimeStamp = data[4];
        const poolAmount = data[5];
        const individualContribution = data[6];
        const currentCycle = data[7];
        const totalCycles = data[8];
        const cycleDuration = data[9];
        const numberOfMembers = data[10];

        return (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <p>
              <strong>Address:</strong> {address}
            </p>
            <p>
              <strong>Title:</strong> {title}
            </p>
            <p>
              <strong>Creation Time:</strong>{" "}
              {new Date(Number(creationTime) * 1000).toLocaleString()}
            </p>
            <p>
              <strong>Starting Time:</strong>{" "}
              {new Date(Number(startingTime) * 1000).toLocaleString()}
            </p>
            <p>
              <strong>Cycle Start Time:</strong>{" "}
              {new Date(Number(cycleStartTime) * 1000).toLocaleString()}
            </p>
            <p>
              <strong>Last Time Stamp:</strong>{" "}
              {new Date(Number(lastTimeStamp) * 1000).toLocaleString()}
            </p>
            <p>
              <strong>Pool Amount:</strong> {poolAmount?.toString()}
            </p>
            <p>
              <strong>Individual Contribution:</strong>{" "}
              {individualContribution?.toString()}
            </p>
            <p>
              <strong>Current Cycle:</strong> {currentCycle?.toString()}
            </p>
            <p>
              <strong>Total Cycles:</strong> {totalCycles?.toString()}
            </p>
            <p>
              <strong>Cycle Duration:</strong> {cycleDuration?.toString()}
            </p>
            <p>
              <strong>Number of Members:</strong> {numberOfMembers?.toString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default EqubDetailEach;
