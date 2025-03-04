"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
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
import { useSwitchActiveWalletChain } from "thirdweb/react";
import { gnosis, sepolia } from 'thirdweb/chains';



import { CirclesConfig, Sdk } from '@circles-sdk/sdk';
import {BrowserProviderContractRunner} from "@circles-sdk/adapter-ethers";


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
const receipentAddress = "0x627836D7E925D882940Fad5cD1f818B0e8d6496A";


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


    let activeAccount = useActiveAccount();
      //let { address: connectedAddress } = useAccount();
    let connectedAddress = activeAccount?.address as `0x${string}`;
    const switchChain = useSwitchActiveWalletChain();



    const [totalBalance, setTotalBalance] = useState(0);
    const [mintableToken, setMintableToken] = useState(0);
  
    const [listOfOutgoingTrust, setListOfOutgoingTrust] = useState<string[]>([]);
    const [listOfIncomingTrust, setListOfIncomingTrust] = useState<string[]>([]);
    const [listOfMutualTrust, setListOfMutualTrust] = useState<string[]>([]);
    const [listAnyTrust, setListAnyTrust] = useState<string[]>([]);


    const [isEligible, setIsEligible] = useState(false);
    const [isCollateralized, setIsCollateralized] = useState(false);


    const { data, isLoading, error, address } = equbDetail;
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const CYCLE_TO_SECONDS = 60 * 60 * 24; 


    const cycleEnd = (starting: any, cycDuration: any, currentCycle: any) => {
      const now = new Date();
      const startingTime = new Date(Number(starting) * 1000);
      const cycleDuration = Number(cycDuration);
      const cycleTime = cycleDuration ;
      const cycleTimeMs =   currentCycle *  cycleTime * CYCLE_TO_SECONDS * 1000;
      const cycleEndTime = new Date(startingTime.getTime() + cycleTimeMs);
      return now > cycleEndTime;
    }

    const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({ 
      contractName: "EthqubFactory" 
    });



    const equbTitle = data ? data[0].toString() : "" ;
    const creationTime = data ?  data[1].toString() : "";
    const startingTime = data ?  data[2].toString() : "";
    const cycleStartTime = data ?  data[3].toString() : "";
    const lastTimeStamp = data ?  data[4].toString() : "";
    const poolAmount = data ?  data[5].toString() : "";
    const individualContribution = data ?  data[6].toString() : "";
    const currentCycle = data ?  data[7].toString() : "";
    const totalCycles = data ?  data[8].toString() : "";
    const cycleDuration = data ?  data[9].toString() : "";
    const numberOfMembers = data ?  data[10].toString() : "";
    const ipfsHash = data ?  data[11].toString() : "";
    const creator = data ?  data[12].toString() : "";
    const currentMember = data ?  data[13].toString() : "";
    const members = data ?  data[14].toString() : "";
    const luckyWinners = data ?  data[15].toString() : "";
    const numberOfCyclesDuePaid = data ?  data[16].toString() : "";
    const creditScore = data ?  data[17].toString() : "";

    const membersArray = members.split(',').map((member: string) => member.trim().toLowerCase());
    const isMember = connectedAddress ? membersArray.includes(connectedAddress.toLowerCase()) : false;


    useEffect(() => {
      const fetchAvatar = async () => {
    
  
     const adapter = new BrowserProviderContractRunner();
          await adapter.init();
          const sdk = new Sdk(adapter,  circlesConfig);
          let avatar = await sdk.getAvatar(connectedAddress);
    
          const mintableToken = await avatar.getMintableAmount();
          setMintableToken(mintableToken);
    
          const balanceToken = await avatar.getTotalBalance();
          setTotalBalance(balanceToken);

    
          avatar.getTrustRelations().then((trustRelations) => {
          console.log('Trust relations:', trustRelations);
          trustRelations.forEach((trusted) => { 
              if (trusted.relation === 'trustedBy') {
                setListOfIncomingTrust((prev) => [...prev, trusted.objectAvatar]);
                setListAnyTrust((prev) => [...prev, trusted.objectAvatar]);
              }
              else if (trusted.relation === 'trusts') {
                setListOfOutgoingTrust((prev) => [...prev, trusted.objectAvatar]);
                setListAnyTrust((prev) => [...prev, trusted.objectAvatar]);
              }
              else if (trusted.relation === 'mutuallyTrusts') {
                setListOfMutualTrust((prev) => [...prev, trusted.objectAvatar]);
                setListAnyTrust((prev) => [...prev, trusted.objectAvatar]);
              }
            }
          );
          });
        };
        fetchAvatar();
    }, [connectedAddress, setTotalBalance, setMintableToken, isEligible, isCollateralized]);

  
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
      await switchChain(sepolia);
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
      await switchChain(gnosis);
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

    const findOutgoingTrust = async (address: string) => {
      await switchChain(gnosis);

      const array: string[] = [];
      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter,  circlesConfig);
      let avatar = await sdk.getAvatar(address as `0x${string}`);

      const trustRelations = await avatar.getTrustRelations()
      console.log('Trust relations: of ',address, "are the following", trustRelations);
      
      trustRelations.forEach((trusted) => { 
        if (trusted.relation === 'trusts') array.push(trusted.objectAvatar);
        else if (trusted.relation === 'mutuallyTrusts') array.push(trusted.objectAvatar);
      });
      
      return array;
    };

    const handleCollateralStake = async (amountToTransfer: number) => {
      await switchChain(gnosis);
      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter,  circlesConfig);
      let avatar = await sdk.getAvatar(connectedAddress);

      console.log("Collateralizing...");
      console.log("Amount to transfer: ", amountToTransfer);

      const maxTransferable = await avatar.getMaxTransferableAmount(receipentAddress)
      console.log(`Maximum transferable amount: ${maxTransferable}`);
      
      const transferReceipt = await avatar.transfer(receipentAddress, amountToTransfer);
      console.log("Transfer receipt: ", transferReceipt)
    };

    

    const checkEligibility = useCallback(async () => {
      await switchChain(gnosis);
      console.log("Checking eligibility...");
  
      const collateralized = totalBalance > creditScore;
      let eligible = false;
  
      for (let i = 0; i < membersArray.length; i++) {
        console.log("111111")
        const trustedArrays = await findOutgoingTrust(membersArray[i]);
        console.log("Trusted arrays: ", trustedArrays);
        for (let j = 0; j < trustedArrays.length; j++) {
          if (trustedArrays[j] === connectedAddress.toLowerCase()) {
          console.log("is trusted", connectedAddress);
          eligible = true;
          break;
        }
      }
    }
  
      // Update state after determining values.
      setIsCollateralized(collateralized);
      setIsEligible(eligible);
  
      // Use local variables for control flow, as state updates are asynchronous.
      if (eligible && collateralized) {
        alert("You are eligible to join this Equb");
        return true;
      } else if (!eligible) {
        alert("You are not trusted to join this Equb");
        return false;
      } else if (!collateralized) {
        alert("You do not have enough CRC to join this Equb");
        return false;
      }
      alert("You are not trusted to join this Equb");
      return false;
    }, [
      switchChain,
      totalBalance,
      creditScore,
      membersArray,
      connectedAddress,
      findOutgoingTrust,
    ]);
  
    // The button's onClick now uses the checkEligibility function.
    const handleEligibility = async () => {
      await checkEligibility();
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


                 {cycleEnd(cycleStartTime, cycleDuration, currentCycle) && (
                  <div className='custom-detail-center-reveal custom-detail-center-join'>
                    <button onClick={handleWithdraw} className="custom-detail-center-join-button relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Reveal Winner
                      </span>
                    </button>
                  </div>
                )} 

          </div>
          <div>

            <div className='custom-detail-center-join'>
              {isMember ? (
                <button
                  disabled
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-500 rounded-lg"
                >
                  <span className="relative px-4 py-2.5 transition-all ease-in duration-75rounded-md" style={{
                      color: "#aaa",
                  }}>
                    
                  </span>
                </button>
              ) : (
                <>
                {(isEligible && isCollateralized) ? (
                  <button
                  disabled
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-500 rounded-lg "
                >
                  <span className="relative px-4 py-2.5 transition-all ease-in duration-75rounded-md" style={{
                      color: "#aaa",
                  }}>
                  <div>Trusted by Members</div>
                  <div>Have enough CRC</div>
                  </span>
                </button>
                ) : (
                  <button
                    onClick={handleEligibility}
                    className="custom-detail-center-join-button relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      Check Eligibility
                    </span>
                  </button>
                )}
                </>
              )}
            </div>

            { (isMember || (isEligible && isCollateralized)) && (
            <div className='custom-detail-center-join'>
              {isMember ? (
                <button
                  disabled
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-500 rounded-lg "
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
                  className="custom-detail-center-join-button custom-detail-center-join-button-je relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white  "
                >
                  <span className="relative px-4 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Join Equb
                  </span>
                </button>
              )}
            </div>
            )}

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
            <EachPlaceHoder name='Min CRC Score' value= {`${creditScore} CRC`}/>
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