"use client";
import React, { use, useState } from 'react';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import EachInput from '~~/components/custom/EachInput';
import { useAccount } from 'wagmi';
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";
import { useEffect } from 'react';
import EachPlaceHoder from '~~/components/custom/EachPlaceHolder';

interface EqubDetailEachEveryProps {
    equbDetail: {
      data: any;
      isLoading: boolean;
      error: any;
      address: any;
    };
  }


const Detail : React.FC<EqubDetailEachEveryProps> = ({ equbDetail}) => {
  const { data, isLoading, error, address } = equbDetail;

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



    const [creator, setCreator] = useState("");
    const [priceFeedAddress, setPriceFeedAddress] = useState("");



  return (
    <>
      <JoinTopHeader />
      <Header />
      <div className='custom-detail'>
        <div className="custom-detail-title">
         Equb's Detail
        </div>
        <div className="custom-detail-logo">
        </div>
        <div  className='custom-create-input'>
          {/* <EachInput name="Creator Address" value={creator} onChange={(e) => setCreator(e.target.value)} /> */}
          {/* <EachInput name='Price Feed Address' value={priceFeedAddress} onChange={(e) => setPriceFeedAddress(e.target.value)} /> */}
          <EachPlaceHoder name="Ethqub's title" value={equbTitle} />
          <EachPlaceHoder name='Total Pool Size' value={poolAmount}  />
          <EachPlaceHoder name='Number of Pool Participants' value={totalCycles}  />
          <EachPlaceHoder name='Payment Frequency' value={cycleDuration}  />
          <EachPlaceHoder name='Individual Contribution' value={individualContribution}  />
          <EachPlaceHoder name='Current Cycle' value={currentCycle}  />
          <EachPlaceHoder name='Number of Members' value={numberOfMembers}  />
          <EachPlaceHoder name='Starting Time' value={startingTime}  />
          <EachPlaceHoder name='Cycle Start Time' value={cycleStartTime}  />
          <EachPlaceHoder name='Last Time Stamp' value={lastTimeStamp}  />
          <EachPlaceHoder name='Creation Time' value={creationTime}  />
        </div>
      </div>
    </>
  );
};

export default Detail;