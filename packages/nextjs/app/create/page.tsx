"use client";
import React, { useState } from 'react';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import EachInput from '~~/components/custom/EachInput';
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useAccount } from 'wagmi';
import { useRef } from 'react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';


const TOKEN_DECIMAL = 1e18;


const Create = () => {
  const PRICE_FEED_ADDRESS = "0x9326BFA02ADD2366b30bacB125260Af641031331";

  let activeAccount = useActiveAccount();
  //let { address: connectedAddress } = useAccount();
  let connectedAddress = activeAccount?.address;

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

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
    
      const ipfsHash = ipfsUrl.split("/").pop();
      console.log(ipfsHash);

      setUrl(ipfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
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
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let deployedAddress: any;
    e.preventDefault();
    try {
      const startingTimeInSeconds = Math.floor(new Date(startingTime).getTime() / 1000);
      console.log(startingTimeInSeconds);
      await writeYourContractAsync(
        {
        functionName: "createEthqub",
        args: [
          connectedAddress,
          equbTitle,
          BigInt(poolAmount) * BigInt(TOKEN_DECIMAL),
          BigInt(totalCycles),
          BigInt(cycleDuration),
          url,
          BigInt(startingTimeInSeconds),
          BigInt(minCreditScore),
          PRICE_FEED_ADDRESS
        ]
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
    ).then((transaction) => {


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

  useEffect(() => {
    if (poolAmount && totalCycles && Number(totalCycles) > 0) {
      const contribution = Number(poolAmount) / Number(totalCycles);
      setIndividualContribution(contribution.toFixed(2));
    } else {
      setIndividualContribution('');
    }

    if (url) {
      setUrl(url);;
    }
  }, [poolAmount, totalCycles, url]);


 

  return (
    <>
      <div  className="custom-sticky"> 
        <JoinTopHeader />
        <Header />
      </div>
      <div className='custom-create'>
        <div className="custom-create-title">
          Create Equb
        </div>
        <div className="custom-create-logo" onClick={() => fileInputRef.current?.click()}>
        {previewUrl  ? (
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
        <div className="custom-create-image">
          <button type="button" disabled={uploading} onClick={uploadFile} style={{ 
            margin: "5px 35px",
            fontFamily: "var(--font-anek-bangla)",
            fontSize: "18px",
           }}>
            {uploading ? "Uploading..." : "IPFS Upload"}
          </button>
        </div>
         <form onSubmit={handleSubmit} className='custom-create-input'>
          {/* <EachInput name="Creator Address" value={creator} onChange={(e) => setCreator(e.target.value)} />  */}
          {/* <EachInput name='Price Feed Address' value={priceFeedAddress} onChange={(e) => setPriceFeedAddress(e.target.value)} />  */}
          <EachInput name="Equb's title" value={equbTitle} onChange={(e) => setEqubTitle(e.target.value)} readOnly={false} type='text'/>
          <EachInput name='Total Pool Amount(ETH)' value={poolAmount} onChange={(e) => setPoolAmount(e.target.value)} readOnly={false}  type='text'/>
          <EachInput name='Number of Participants' value={totalCycles} onChange={(e) => setTotalCycles(e.target.value)} readOnly={false}  type='text'/>
          <EachInput name='Individual Contribution(ETH)'  value={individualContribution} onChange={() => {}} readOnly={true}  type='text'/>
          <EachInput name='Start Date & Time' value={startingTime} onChange={(e) => setStartingTime(e.target.value)} readOnly={false}  type='datetime-local'/>
          <EachInput name='Payment Frequency(Days)' value={cycleDuration} onChange={(e) => setCycleDuration(e.target.value)} readOnly={false}  type='text'/>
          <EachInput name='Min Credit Score' value={minCreditScore || '0'} onChange={(e) => setMinCreditScore(e.target.value)} readOnly={true}  type='text'/>
          <EachInput name='IPFS Hash' value={url} onChange={() => {}} readOnly={true}  type='text'/>

          <button type='submit' className='custom-create-button'>
            Create equb
          </button>
        </form>  
      </div>
    </>
  );
};

export default Create;