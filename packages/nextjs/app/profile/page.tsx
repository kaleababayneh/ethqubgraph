"use client";
import React, { useState } from "react";
import { useAccount } from 'wagmi';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import { Address } from '~~/components/scaffold-eth';
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useEffect } from 'react';
import Angle from '~~/components/custom/Angle';
import AngleL from '~~/components/custom/AngleL';
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import WalletProfileActive from '~~/components/custom/walletProfileActive';
import WalletProfilePast from '~~/components/custom/walletProfilePast';


import { CirclesConfig, Sdk } from '@circles-sdk/sdk';
import {BrowserProviderContractRunner} from "@circles-sdk/adapter-ethers"
import { GroupProfile, Profile, Profiles } from '@circles-sdk/profiles';



export const circlesConfig: CirclesConfig = {
  circlesRpcUrl: "https://static.94.138.251.148.clients.your-server.de/rpc/",
  v1HubAddress: "0x29b9a7fbb8995b2423a71cc17cf9810798f6c543",
  v2HubAddress: "0x3D61f0A272eC69d65F5CFF097212079aaFDe8267",
  migrationAddress: "0x28141b6743c8569Ad8B20Ac09046Ba26F9Fb1c90",
  nameRegistryAddress: "0x8D1BEBbf5b8DFCef0F7E2039e4106A76Cb66f968",
  baseGroupMintPolicy: "0x79Cbc9C7077dF161b92a745345A6Ade3fC626A60",
  profileServiceUrl: "https://static.94.138.251.148.clients.your-server.de/profiles/",
};


const ProfileP = () => {

  const [trustRelations, setTrustRelations] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [maxTransferable, setMaxTransferable] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [avatarInfo, setAvatarInfo] = useState(null);
  const [mintableToken, setMintableToken] = useState(0);
  const [mintTransaction, setMintTransaction] = useState(null);
  const [trustReceipt, setTrustReceipt] = useState(null);

  let activeAccount = useActiveAccount();
  let { address: connectedAddress } = useAccount();
  connectedAddress = connectedAddress || "";
  //let connectedAddress = activeAccount?.address;


  useEffect(() => {
    const fetchAvatar = async () => {

      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter, circlesConfig);
      let avatar = await sdk.getAvatar(connectedAddress);

      const mintableToken = await avatar.getMintableAmount();
      setMintableToken(mintableToken);

      const balanceToken = await avatar.getTotalBalance();
      setTotalBalance(balanceToken);

      // const mintTransaction = await avatar.personalMint();
      //const trustReceipt = await avatar.trust(inviteeAddress);
      
     avatar.getTrustRelations().then((trustRelations) => {
      console.log('Trust relations:', trustRelations);
      // trustRelations.forEach((relation) => { 
      //     console.log(`${relation.objectAvatar}`);
      // });
     });

      //const maxTransferable = await avatar.getMaxTransferableAmount(inviteeAddress)
      console.log(`Maximum transferable amount: ${maxTransferable}`);


      console.log('Creating new group avatar...', sdk);
    };
    fetchAvatar();
  }, [connectedAddress]);


  const handleMint = async () => {
    try {
      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter, circlesConfig);
      let avatar = await sdk.getAvatar(connectedAddress);
      const mintTransaction = await avatar.personalMint();

      const mintableToken = await avatar.getMintableAmount();
      setMintableToken(mintableToken);

      const balanceToken = await avatar.getTotalBalance();
      setTotalBalance(balanceToken);

      console.log('Mint transaction:', mintTransaction);
      
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };



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

             <div className='profile-content-sidebar-credit'>

              {/* show mintable token amount   */} 
              <h1>
              Total Balance : {totalBalance.toFixed(2)} CRC
              </h1>
             <h1>
              Mintable Token : {mintableToken} CRC
              </h1>
              <button onClick={handleMint} className="mint-button">Mint</button>

              {/* <div className='profile-content-sidebar-credit-title'>
                Credit Score
              </div>
              <div className='profile-content-sidebar-credit-score'>
                <div className='profile-content-sidebar-credit-score-value'>
                  70
                </div>
              </div> */}
            </div> 

          </div>

          {/* <div className='profile-content-main'>
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
       
          </div> */}
        </div>
    </div>
  )
}

export default ProfileP;




// const newProfile: Profile = {
//   name: "Kaleab Avatar Name",
//   description: "Kaleab Updated description for the avatar.",
//   imageUrl: "ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
//   // previewImageUrl : "ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
// };
