"use client";
import React, { useState } from 'react';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import EachInput from '~~/components/custom/EachInput';
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";
import { useAccount } from 'wagmi';

const Create = () => {
  const { address: connectedAddress } = useAccount();
  console.log("connected   ",connectedAddress);

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({
    contractName: "EthqubFactory"
  });

  const [creator, setCreator] = useState(connectedAddress);
  const [equbTitle, setEqubTitle] = useState('');
  const [poolAmount, setPoolAmount] = useState('');
  const [totalCycles, setTotalCycles] = useState('');
  const [cycleDuration, setCycleDuration] = useState('');
  const [priceFeedAddress, setPriceFeedAddress] = useState(connectedAddress);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      writeYourContractAsync({
        functionName: "createEthqub",
        args: [
          connectedAddress,
          equbTitle,
          BigInt(poolAmount),
          BigInt(totalCycles),
          BigInt(cycleDuration),
          connectedAddress
        ]
      }).then(() => {
      setEqubTitle('');
      setPoolAmount('');
      setTotalCycles('');
      setCycleDuration('');
      setPriceFeedAddress('');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <JoinTopHeader />
      <Header />
      <div className='custom-create'>
        <div className="custom-create-title">
          Create Equb
        </div>
        <div className="custom-create-logo">
        </div>
        <form onSubmit={handleSubmit} className='custom-create-input'>
          {/* <EachInput name="Creator Address" value={creator} onChange={(e) => setCreator(e.target.value)} /> */}
          <EachInput name="Ethqub's title" value={equbTitle} onChange={(e) => setEqubTitle(e.target.value)} />
          <EachInput name='Total Pool Size' value={poolAmount} onChange={(e) => setPoolAmount(e.target.value)} />
          <EachInput name='Number of Pool Participants' value={totalCycles} onChange={(e) => setTotalCycles(e.target.value)} />
          <EachInput name='Payment Frequency' value={cycleDuration} onChange={(e) => setCycleDuration(e.target.value)} />
          {/* <EachInput name='Price Feed Address' value={priceFeedAddress} onChange={(e) => setPriceFeedAddress(e.target.value)} /> */}
          <button type='submit' className='custom-create-button'>
            Create equb
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;