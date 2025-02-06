"use client"
import React from 'react';
import './page.css';
import { useState } from 'react';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract"
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract"



const Equb = () => {

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({
    contractName: "EthqubFactory" 
  
  });

  const [creator, setCreator] = useState('');
  const [equbTitle, setEqubTitle] = useState('');
  const [poolAmount, setPoolAmount] = useState('');
  const [totalCycles, setTotalCycles] = useState('');
  const [cycleDuration, setCycleDuration] = useState('');
  const [priceFeedAddress, setPriceFeedAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
   
        await writeYourContractAsync({
          functionName: "createEthqub",
          args : [
            creator,
            equbTitle,
            BigInt(poolAmount),
            BigInt(totalCycles),
            BigInt(cycleDuration),
            priceFeedAddress
           
          ]
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='home-page'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Creator Address:</label>
          <input
            type='text'
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Equb Title:</label>
          <input
            type='text'
            value={equbTitle}
            onChange={(e) => setEqubTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pool Amount:</label>
          <input
            type='bigNumber'
            value={poolAmount}
            onChange={(e) => setPoolAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Cycles:</label>
          <input
            type='bigNumber'
            value={totalCycles}
            onChange={(e) => setTotalCycles(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cycle Duration:</label>
          <input
            type='bigNumber'
            value={cycleDuration}
            onChange={(e) => setCycleDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price Feed Address:</label>
          <input
            type='text'
            value={priceFeedAddress}
            onChange={(e) => setPriceFeedAddress(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='home-button'>Create Equb</button>
      </form>
    </div>
  );
};

export default Equb;