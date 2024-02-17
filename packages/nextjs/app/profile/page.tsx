"use client";
import React from 'react'
import { useAccount } from 'wagmi';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import { Address } from '~~/components/scaffold-eth';
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useEffect } from 'react';
import EqubImageCard from '~~/components/custom/EqubImageCard';
import Angle from '~~/components/custom/Angle';
import AngleL from '~~/components/custom/AngleL';
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import WalletProfileActive from '~~/components/custom/walletProfileActive';
import WalletProfilePast from '~~/components/custom/walletProfilePast';


interface EqubDetailEachProps {
  equbDetails: string[];
}


const Profile = () => {

  
  let activeAccount = useActiveAccount();
  let connectedAddress = activeAccount?.address;


  useEffect(() => {
      console.log(connectedAddress);

  }, [connectedAddress]);


   const { data: equbList } = useScaffoldReadContract({
          contractName: "EthqubFactory",
          functionName: "getDeployedContracts",
          watch: true,
    });



    const isArray = Array.isArray(equbList);



  return (


    <div className='profile'>
        <div  className="custom-sticky"> 
          <JoinTopHeader />
          <Header />
        </div>

        <div className='profile-banner'>
          <div className='profile-banner-avator'>
          {connectedAddress && <BlockieAvatar address={connectedAddress} size={130}/>}
          </div>
        </div>

        <div className='profile-content'>
         <div className='profile-content-sidebar'>
            <div className='profile-content-sidebar-address'>
            {connectedAddress?.slice(0, 6)}... {connectedAddress?.slice(-6)}
            </div>

            {/* <div className='profile-content-sidebar-credit'>
              <div className='profile-content-sidebar-credit-title'>
                Credit Score
              </div>


              <div className='profile-content-sidebar-credit-score'>
                <div className='profile-content-sidebar-credit-score-value'>
                  70
                </div>
              </div>
            </div> */}

          </div>

          <div className='profile-content-main'>
            <div className='profile-content-main-active'>
                <div className="profile-content-main-active-title">
                    Active Equbs  
                </div>

                <div className="profile-content-main-active-content">
                  <Angle />

                  <div className="profile-content-main-active-content-equb">
                    {isArray ? (
                        <WalletProfileActive equbDetails={equbList} /> 
                    ) : (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}>
                        
                        </div>
                    )}
                  </div>

                

                  <AngleL />
                </div>
            </div>
            <div className='profile-content-main-history'>
                <div className="profile-content-main-history-title">
                  Past Equbs
                </div>

                <div className="profile-content-main-history-content">
                  <Angle />

                  <div className="profile-content-main-active-content-equb">
                    {isArray ? (
                        <WalletProfilePast equbDetails={equbList} /> 
                    ) : (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}>
                        
                        </div>
                    )}
                  </div>

                  <AngleL />

                  <div className='profile-content-main-history-cover'>
                  </div>
                </div>

            </div>
       
          </div>
        </div>
    </div>
  )
}

export default Profile;