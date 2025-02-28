"use client";
import React, { useState, useRef, useEffect } from 'react';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import EachInput from '~~/components/custom/EachInput';
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useActiveAccount } from 'thirdweb/react';
import confetti from 'canvas-confetti';

import { CirclesConfig, Sdk } from '@circles-sdk/sdk';
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers";

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export const circlesConfig: CirclesConfig = {
  circlesRpcUrl: "https://static.94.138.251.148.clients.your-server.de/rpc/",
  v1HubAddress: "0x29b9a7fbb8995b2423a71cc17cf9810798f6c543",
  v2HubAddress: "0x3D61f0A272eC69d65F5CFF097212079aaFDe8267",
  migrationAddress: "0x28141b6743c8569Ad8B20Ac09046Ba26F9Fb1c90",
  nameRegistryAddress: "0x8D1BEBbf5b8DFCef0F7E2039e4106A76Cb66f968",
  baseGroupMintPolicy: "0x79Cbc9C7077dF161b92a745345A6Ade3fC626A60",
  profileServiceUrl: "https://static.94.138.251.148.clients.your-server.de/profiles/",
};

const TOKEN_DECIMAL = 1e18;

const Create = () => {
  const PRICE_FEED_ADDRESS = "0x9326BFA02ADD2366b30bacB125260Af641031331";

  let activeAccount = useActiveAccount();
  let connectedAddress = activeAccount?.address as `0x${string}` || "0x0000000000000000000000000000000000000000";

  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({
    contractName: "EthqubFactory"
  });

  const [creator, setCreator] = useState(connectedAddress);
  const [equbTitle, setEqubTitle] = useState('');
  const [poolAmount, setPoolAmount] = useState('');
  const [totalCycles, setTotalCycles] = useState('');
  const [cycleDuration, setCycleDuration] = useState('');
  const [individualContribution, setIndividualContribution] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [minCreditScore, setMinCreditScore] = useState('');
  const [priceFeedAddress, setPriceFeedAddress] = useState(connectedAddress);
  const [totalBalance, setTotalBalance] = useState(0);

  const uploadFile = async (fileParam?: File) => {
    const fileToUpload = fileParam || file;
    if (!fileToUpload) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
      const ipfsHash = ipfsUrl.split("/").pop();
      setUrl(ipfsHash);
      setUploading(false);
    } catch (e) {
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        // Automatically upload file when selected
        uploadFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(minCreditScore) >= Number(totalBalance)) {
      Toastify({
        text: "Min CRC Score should be less than total balance",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      return;
    }
  

    let deployedAddress: any;
    try {
      const startingTimeInSeconds = Math.floor(new Date(startingTime).getTime() / 1000);
      console.log(startingTimeInSeconds);
      await writeYourContractAsync(
        {
          functionName: "createEthqub",
          args: [
            connectedAddress,
            equbTitle,
            BigInt(Number(poolAmount) * TOKEN_DECIMAL),
            BigInt(totalCycles),
            BigInt(cycleDuration),
            url,
            BigInt(startingTimeInSeconds),
            BigInt(minCreditScore),
            PRICE_FEED_ADDRESS
          ],
          value: poolAmount && totalCycles ? BigInt(Number(poolAmount) * TOKEN_DECIMAL) / BigInt(totalCycles) : BigInt(0),
        },
        {
          onBlockConfirmation: txnReceipt => {
            confetti({
              particleCount: 800,
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
      ).then(() => {
        setEqubTitle('');
        setPoolAmount('');
        setTotalCycles('');
        setCycleDuration('');
        setStartingTime('');
        setMinCreditScore('');
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( () => {
    const fetchAvatar = async () => {
    if (poolAmount && totalCycles && Number(totalCycles) > 0) {


      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter, circlesConfig);
      let avatar = await sdk.getAvatar(connectedAddress);

    

      const balanceToken = await avatar.getTotalBalance();
      setTotalBalance(balanceToken);



      const contribution = Number(poolAmount) / Number(totalCycles);
      setIndividualContribution(contribution.toFixed(3));


    } else {
      setIndividualContribution('');
    }
  }
  fetchAvatar();
  }, [poolAmount, totalCycles]);

  return (
    <>
      <div className="custom-sticky"> 
        <JoinTopHeader />
        <Header />
      </div>
      <div className='custom-create'>
        <div className="custom-create-title">
          Create Equb
        </div>
        <div className="custom-create-logo" onClick={() => fileInputRef.current?.click()}>
          {previewUrl ? (
            <img src={previewUrl} alt="Upload Image" style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} />
          ) : (
            <p>Upload image</p>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <form onSubmit={handleSubmit} className='custom-create-input'>
          <EachInput name="Equb's title" value={equbTitle} onChange={(e) => setEqubTitle(e.target.value)} readOnly={false} type='text' />
          <EachInput name='Total Equb amount(ETH)' value={poolAmount} onChange={(e) => setPoolAmount(e.target.value)} readOnly={false} type='text' />
          <EachInput name='Number of Participants' value={totalCycles} onChange={(e) => setTotalCycles(e.target.value)} readOnly={false} type='text' />
          <EachInput name='Individual Contribution(ETH)'  value={individualContribution} onChange={() => {}} readOnly={true} type='text' />
          <EachInput name='Start Date & Time' value={startingTime} onChange={(e) => setStartingTime(e.target.value)} readOnly={false} type='datetime-local' />
          <EachInput name='Payment Frequency(Days)' value={cycleDuration} onChange={(e) => setCycleDuration(e.target.value)} readOnly={false} type='text' />
          <EachInput name='Min CRC Score' value={minCreditScore || '0'} onChange={(e) => setMinCreditScore(e.target.value)} readOnly={false} type='text' />
          <EachInput name='IPFS Hash' value={url} onChange={() => {}} readOnly={true} type='text' />
          <button type='submit' className='custom-create-button'>
            Create equb
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;