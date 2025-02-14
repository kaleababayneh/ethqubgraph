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
import { useActiveAccount } from "thirdweb/react";
import confetti from 'canvas-confetti';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";


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

  console.log("Equb Detail", equbDetail);
  let activeAccount = useActiveAccount();
    //let { address: connectedAddress } = useAccount();
  let connectedAddress = activeAccount?.address;
  const [priceFeedAddress, setPriceFeedAddress] = useState("");

  const { data, isLoading, error, address } = equbDetail;
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const CYCLE_TO_SECONDS = 60 * 60 * 24; 


  const cycleEnd = (starting: any, cycDuration: any) => {
    const now = new Date();
    const startingTime = new Date(Number(starting) * 1000);
    const cycleDuration = Number(cycDuration);
    const cycleTime = cycleDuration ;
    const cycleTimeMs = cycleTime * CYCLE_TO_SECONDS * 1000;
    const cycleEndTime = new Date(startingTime.getTime() + cycleTimeMs);
    console.log(cycleEndTime);
    return now > cycleEndTime;
  }

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({ 
    contractName: "EthqubFactory" 
  });

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
    const luckyWinners = data[15].toString();
    const numberOfCyclesDuePaid = data[16].toString();



    const membersArray = members.split(',').map((member: string) => member.trim().toLowerCase());
    const isMember = connectedAddress ? membersArray.includes(connectedAddress.toLowerCase()) : false;
  
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
      var colors = ['#ddcb46', '#ffffff'];

       try {
           await writeYourContractAsync({
             functionName: "joinEthqub",
             args : [equbDetail.address, connectedAddress],
             value: BigInt(individualContribution),
           },
           {
             onBlockConfirmation: txnReceipt => {
                confetti({
                  particleCount: 600,
                  angle: 60,
                  spread: 55,
                  origin: { x: 0 },
                  colors: colors
                });
                confetti({
                  particleCount: 600,
                  angle: 120,
                  spread: 55,
                  origin: { x: 1 },
                  colors: colors
                });
                }
            }
          );
         } catch (e) {
          console.error("Error setting greeting:", e);
         }
    };

  const handleWithdraw = async () => {

      try {
          await writeYourContractAsync({
            functionName: "withdrawEthqub",
            args : [equbDetail.address],
          },
        );
      } catch (e) {
        console.error("Error setting greeting:", e);
      }
    };

  const handleGetCycle = async () => {
      await writeYourContractAsync({
            functionName: "getCycle",
            args: [address],
        });
  }

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


                 {/* {cycleEnd(cycleStartTime) && (
                  <div className='custom-detail-center-reveal custom-detail-center-join'>
                    <button onClick={handleWithdraw} className="custom-detail-center-join-button relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Reveal Winner
                      </span>
                    </button>
                  </div>
                )}  */}

          </div>
          <div>

            <div className='custom-detail-center-join'>
              {isMember ? (
                <button
                  disabled
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-200"
                >
                  <span className="relative px-4 py-2.5 transition-all ease-in duration-75rounded-md" style={{
                      color: "#aaa",
                  }}>
                    Joined
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => handleJoin(individualContribution)}
                  className="custom-detail-center-join-button relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-4 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Join Equb
                  </span>
                </button>
              )}
            </div>

            <div className='custom-detail-button' onClick={() => setIsPopupVisible(!isPopupVisible)}>
                {isPopupVisible ? "Hide Details" : "Show Detail"} 
            </div>
          </div>
        </div>

        <div className='custom-detail-wrapper'>
       
          <div  className='custom-create-input'>
            {/* <EachInput name='Price Feed Address' value={priceFeedAddress} onChange={(e) => setPriceFeedAddress(e.target.value)} /> */}
            <EachPlaceHoder name="Ethqub's title" value={equbTitle} />
            <EachPlaceHoder name='Creator Address' value={creator}  />
            <EachPlaceHoder name='Total Equb Amount(ETH)' value={(poolAmount/TOKEN_DECIMAL).toFixed(3)}  />
            <EachPlaceHoder name='Number of Participants' value={totalCycles}  />
            <EachPlaceHoder name='Individual Contribution(ETH)' value={(individualContribution/TOKEN_DECIMAL).toFixed(3)}  />
            <EachPlaceHoder name='Payment Frequency(Days)' value={cycleDuration}  />
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
                  Last Received 
                </div>
                <div className="custom-detail-popup-body-sent-details">
                  {luckyWinners.split(',').slice(-1).map((winner: string, index: number) => (
                    <div key={index} className="custom-detail-popup-sent-details-each">
                      {winner && <Dot/>} {winner?.slice(0, 6)} {winner && "..."}  {winner?.slice(-6)}
                    </div>
                  ))}
                </div>
               
              </div>

              <div className="custom-detail-popup-body-sent">
                  
                  <div className="custom-detail-popup-body-sent-title">
                    Sent 
                  </div>
                  <div className="custom-detail-popup-body-sent-details">
                      {members.split(',').map((member: string, index: number) => (
                    numberOfCyclesDuePaid.split(',')[index] >= currentCycle + 1 && (
                    <div key={index} className="custom-detail-popup-sent-details-each">
                      <Dot/> {member?.slice(0, 6)} ... {member?.slice(-6)}
                    </div>
                    )
                  ))}
                  </div>

              </div>

                <div className="custom-detail-popup-body-sent custom-detail-popup-body-sent-failed">
                
                 <div className="custom-detail-popup-body-sent-title custom-detail-popup-body-failed-title">
                  Failed to Send 
                  </div>
                  <div className="custom-detail-popup-body-sent-details custom-detail-popup-body-failed-details">
                  {members.split(',').map((member: string, index: number) => (
                    numberOfCyclesDuePaid.split(',')[index] < currentCycle + 1 && (
                    <div key={index} className="custom-detail-popup-sent-details-each">
                      <DotRed/> {member?.slice(0, 6)}... {member?.slice(-6)}
                    </div>
                    )
                  ))}
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