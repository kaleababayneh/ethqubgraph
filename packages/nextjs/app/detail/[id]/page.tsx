"use client";
import React, { useEffect, useState, useRef } from 'react';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import EachPlaceHoder from '~~/components/custom/EachPlaceHolder';
import Angle from '~~/components/custom/Angle';
import AngleL from '~~/components/custom/AngleL';
import { SyncLoader } from 'react-spinners';
import CountDown from '~~/components/custom/CountDown';
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";
import { parseEther } from 'viem';
import { Token } from 'graphql';

const TOKEN_DECIMAL = 1e18;


interface EqubDetailEachEveryProps {
    equbDetail: {
      data: any;
      isLoading: boolean;
      error: any;
      address: any;
    };
  }

const Dot = () => (
  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
);

const DotRed = () => (
  <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
);


const Detail : React.FC<EqubDetailEachEveryProps> = ({ equbDetail}) => {
  const { data, isLoading, error, address } = equbDetail;
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const CYCLE_TO_SECONDS = 24 * 3600;

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({ 
    contractName: "EthqubFactory" 
  });



  const [priceFeedAddress, setPriceFeedAddress] = useState("");


  if (isLoading)
    return (
      <p>
         <SyncLoader size={20} margin={20} color='rgb(232, 218, 255)'/>
      </p>
    );

  if (error)
    return (
      <p>
        Error loading details for <strong>{address}</strong>: {error.message}
      </p>
    );

  if (!data)
    return (
      <p>
         <SyncLoader size={20} margin={20} color='rgb(232, 218, 255)'/>
      </p>
    );

    const equbTitle = data[0].toString();
    const creationTime = data[1].toString();
    const startingTime = data[2].toString();
    const cycleStartTime = data[3].toString();
    const lastTimeStamp = data[4].toString();
    const poolAmount = data[5].toString();
    const individualContribution = data[6].toString();
    const currentCycle = data[7].toString();
    const totalCycles = data[8].toString();
    const cycleDuration = data[9].toString();
    const numberOfMembers = data[10].toString();
    const ipfsHash = data[11].toString();
    const creator = data[12].toString();
    const currentMember = data[13].toString();
    const members = data[14].toString();


    const formatDateTimeLocal = (dateString: any) => {
      const date = new Date(Number(dateString) * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleJoin = async (individualContribution: string) => {
       try {
           await writeYourContractAsync({
             functionName: "joinEthqub",
             args : [address],
             value: BigInt(individualContribution),
           });
         } catch (e) {
          console.error("Error setting greeting:", e);
         }
    };      

  return (
    <>
      <div className='custom-equb-detail'>
      <div  className="custom-sticky"> 
        <JoinTopHeader />
        <Header />
      </div>
      <div className='custom-detail'>
        <div className='custom-detail-mainheader'>

          <div className='custom-detail-header'>
            <div className="custom-detail-title">
            Equb's Detail
            </div>
            <div className="custom-detail-logo">
            <img src={"https://"+ipfsHash + ".ipfs.dweb.link"} alt="Upload Image" style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  }} />
            </div>
          </div>
          
          <div className='custom-detail-center'>
                <div className='custom-detail-center-title'>
                    {currentCycle == 0 ? "Starting in..." : "Next round starts in"}
                </div>
                <CountDown startsIn={cycleStartTime} />
                <div className='custom-detail-center-join'>
                  <button onClick={() => handleJoin(individualContribution)}>
                    Join Equb
                  </button>
                </div>
          </div>

          <div className='custom-detail-button' onClick={() => setIsPopupVisible(!isPopupVisible)}>
              {isPopupVisible ? "Hide Details" : "Show Detail"} 
          </div>
        </div>

        <div className='custom-detail-wrapper'>
       
          <div  className='custom-create-input'>
            {/* <EachInput name='Price Feed Address' value={priceFeedAddress} onChange={(e) => setPriceFeedAddress(e.target.value)} /> */}
            <EachPlaceHoder name="Ethqub's title" value={equbTitle} />
            <EachPlaceHoder name='Creator Address' value={creator}  />
            <EachPlaceHoder name='Total Pool Amount(ETH)' value={(poolAmount/TOKEN_DECIMAL).toFixed(1)}  />
            <EachPlaceHoder name='Number of Participants' value={totalCycles}  />
            <EachPlaceHoder name='Individual Contribution(ETH)' value={(individualContribution/TOKEN_DECIMAL).toFixed(1)}  />
            <EachPlaceHoder name='Payment Frequency' value={cycleDuration}  />
            <EachPlaceHoder name='Current Cycle' value={currentCycle}  />
            <EachPlaceHoder name='Number of Members' value={numberOfMembers}  />
            <EachPlaceHoder name='Starting Time' value={formatDateTimeLocal(startingTime)} type='datetime-local'  />
            <EachPlaceHoder name='Cycle Start Time' value={formatDateTimeLocal(cycleStartTime)} type='datetime-local'  />
            <EachPlaceHoder name='Last Withdrawal Time' value={currentCycle == 0 ? "Has not started yet": formatDateTimeLocal(Number(startingTime) + cycleDuration * currentCycle * CYCLE_TO_SECONDS)}  />
            <EachPlaceHoder name='Creation Time' value={formatDateTimeLocal(creationTime)} type='datetime-local'  />
          </div>
      

          
           {isPopupVisible && (
              <div className='custom-detail-popup' ref={popupRef}>
            <div className='custom-detail-popup-top'>
              <Angle />
              <div className='custom-detail-popup-header'>
                    {Array.from({ length: Number(totalCycles) }, (_, index) => (
                      <div key={index} className='custom-detail-popup-header-each'>
                        Cycle {index + 1}
                      </div>
                    ))}
              </div>

              <AngleL />
            </div>
            <div className='custom-detail-popup-body'>
              <div className="custom-detail-popup-body-sent">

                <div className="custom-detail-popup-body-sent-title">
                  Last Recieved 
                </div>
                <div className="custom-detail-popup-body-sent-details">
                    <div className="custom-detail-popup-sent-details-each">
                      <Dot/> 0x676fb2f993f78b
                    </div>
                </div>
               
              </div>

              <div className="custom-detail-popup-body-sent">
                  
                  <div className="custom-detail-popup-body-sent-title">
                    Sent 
                  </div>
                  <div className="custom-detail-popup-body-sent-details">
                    <div className="custom-detail-popup-sent-details-each">
                      <Dot/>  0x676fb6993f78b
                    </div>
                    <div className="custom-detail-popup-sent-details-each">
                      <Dot/>  0x763427888867
                    </div>
                  </div>

              </div>

              <div className="custom-detail-popup-body-sent">
                
                 <div className="custom-detail-popup-body-sent-title custom-detail-popup-body-failed-title">
                    Failed to Send 
                  </div>
                  <div className="custom-detail-popup-body-sent-details custom-detail-popup-body-failed-details">
                    <div className="custom-detail-popup-sent-details-each">
                        <DotRed/> 0x676fb6993f78b
                      </div>
                      <div className="custom-detail-popup-sent-details-each">
                        <DotRed/> 0x763567888867
                      </div>
                  </div>
              </div>

              <div className="custom-detail-popup-body-sent">
                  <div className="custom-detail-popup-body-sent-title">
                    Members
                  </div>
                  <div className="custom-detail-popup-body-sent-details">
                    {members.split(',').map((member: string, index: number) => (
                      <div key={index} className="custom-detail-popup-sent-details-each">
                      <Dot /> {member?.slice(0, 6)}... {member?.slice(-6)}
                      </div>
                    ))}
                  </div>

              </div> 

            </div>
          </div> 
            )}
        </div>

       </div>
      </div>
    </>
  );
};

export default Detail;