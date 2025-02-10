"use client";
import React, { useEffect, useState, useRef } from 'react';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import EachPlaceHoder from '~~/components/custom/EachPlaceHolder';
import Angle from '~~/components/custom/Angle';
import AngleL from '~~/components/custom/AngleL';


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



  if (isLoading)
    return (
      <p>
        Loading details for <strong>{address}</strong>...
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
        No details available for <strong>{address}</strong>
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



    const [creator, setCreator] = useState("");
    const [priceFeedAddress, setPriceFeedAddress] = useState("");



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
          <div className='custom-detail-button' onClick={() => setIsPopupVisible(!isPopupVisible)}>
              {isPopupVisible ? "Hide Details" : "Show Detail"} 
          </div>
        </div>

        <div className='custom-detail-wrapper'>
       
          <div  className='custom-create-input'>
            {/* <EachInput name="Creator Address" value={creator} onChange={(e) => setCreator(e.target.value)} /> */}
            {/* <EachInput name='Price Feed Address' value={priceFeedAddress} onChange={(e) => setPriceFeedAddress(e.target.value)} /> */}
            <EachPlaceHoder name="Ethqub's title" value={equbTitle} />
            <EachPlaceHoder name='Total Pool Amount(ETH)' value={poolAmount}  />
            <EachPlaceHoder name='Number of Participants' value={totalCycles}  />
            <EachPlaceHoder name='Individual Contribution(ETH)' value={individualContribution}  />
            <EachPlaceHoder name='Payment Frequency' value={cycleDuration}  />
            <EachPlaceHoder name='Current Cycle' value={currentCycle}  />
            <EachPlaceHoder name='Number of Members' value={numberOfMembers}  />
            <EachPlaceHoder name='Starting Time' value={startingTime}  />
            <EachPlaceHoder name='Cycle Start Time' value={cycleStartTime}  />
            <EachPlaceHoder name='Last Time Stamp' value={lastTimeStamp}  />
            <EachPlaceHoder name='Creation Time' value={creationTime}  />
          </div>
      

          
           {isPopupVisible && (
              <div className='custom-detail-popup' ref={popupRef}>
            <div className='custom-detail-popup-top'>
              <Angle />
              <div className='custom-detail-popup-header'>
                    <div className='custom-detail-popup-header-each'>
                      Cycle 1
                    </div>

                    <div className='custom-detail-popup-header-each'>
                      Cycle 2
                    </div>

                    <div className='custom-detail-popup-header-each'>
                      Cycle 3
                    </div>

                    <div className='custom-detail-popup-header-each'>
                      Cycle 4
                    </div>

                    <div className='custom-detail-popup-header-each'>
                      Cycle 5
                    </div>
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
                    <div className="custom-detail-popup-sent-details-each">
                      <Dot/>  0x676f993f7b8b
                    </div>
                    <div className="custom-detail-popup-sent-details-each">
                      <Dot/>  0x763478888867
                    </div>
                    <div className="custom-detail-popup-sent-details-each">
                      <Dot/>  0x763467888867
                    </div>
                    <div className="custom-detail-popup-sent-details-each">
                      <Dot/>  0x763997888867
                    </div>
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