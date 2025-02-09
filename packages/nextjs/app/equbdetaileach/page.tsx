"use client";
import React from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

interface EqubDetailEachGenProps {
  equbDetails: string[];
}

const EqubDetailEachGen: React.FC<EqubDetailEachGenProps> = ({ equbDetails }) => {

  const detailsData = equbDetails.map((address: string) => {
    const { data, isLoading, error } = useScaffoldReadContract({
      contractName: "EthqubFactory",
      functionName: "getEthqubDetails",
      args: [address],
      watch: true,
    });
    return { data, isLoading, error, address };
  });


  console.log(detailsData);
  return (
    <div>
       {detailsData.map((item, index) => (
          <div key={index}>
            {item.isLoading ? (
              <p>Loading...</p>
            ) : item.error ? (
              <p>Error: {item.error.message}</p>
            ) : (
              <div>
                <p>Address: {item.address}</p>
                <div>
                  {item.data && Object.entries(item.data).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {typeof value === 'bigint' ? value.toString() : value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
      ))} 
    </div>
  );
};

export default EqubDetailEachGen;