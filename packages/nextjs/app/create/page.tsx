"use client";
import React, { useState } from 'react';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import EachInput from '~~/components/custom/EachInput';
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth';
import { useScaffoldWatchContractEvent } from '~~/hooks/scaffold-eth';
import { useAccount } from 'wagmi';
import { uploadToIPFS } from './config';
import confetti from 'canvas-confetti';



const Create = () => {
  const { address: connectedAddress } = useAccount();

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({
    contractName: "EthqubFactory"
  });



  const [creator, setCreator] = useState(connectedAddress);
  const [equbTitle, setEqubTitle] = useState('');
  const [poolAmount, setPoolAmount] = useState('');
  const [totalCycles, setTotalCycles] = useState('');
  const [cycleDuration, setCycleDuration] = useState('');
  const [priceFeedAddress, setPriceFeedAddress] = useState(connectedAddress);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const jsonData = file; // Replace with actual JSON data if needed
      const fileName = file.name;
      await uploadToIPFS({ jsonData, fileName });
    }
  }



  const handleSubmit = async (e: React.FormEvent) => {
    let deployedAddress: any;
    e.preventDefault();
    try {
      await writeYourContractAsync(
        {
        functionName: "createEthqub",
        args: [
          connectedAddress,
          equbTitle,
          BigInt(poolAmount),
          BigInt(totalCycles),
          BigInt(cycleDuration),
          connectedAddress
        ]
      },  
      {
        onBlockConfirmation: txnReceipt => {
          confetti({
            particleCount: 500,
            spread: 180,
            origin: { y: 0.6 },
          });
        
        deployedAddress = txnReceipt.logs[0].topics[1];
        deployedAddress = "0x" + deployedAddress?.slice(-40);
        setTimeout(() => {
          window.location.href = `/equbdetail/${deployedAddress}`;
        }, 1800);
      }
    }
    ).then((transaction) => {


        setEqubTitle('');
        setPoolAmount('');
        setTotalCycles('');
        setCycleDuration('');
        

          });
        // get the equb address from the transaction object
        // go to http://localhost:3000/equbdetail/equbAddress
   
     
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
        {/* <div  className="custom-create-image">
          <input type="file" onChange={handleImageUpload} />
        </div> */}
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