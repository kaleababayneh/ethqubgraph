"use client";
import React, { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import Header from '~~/components/custom/Header';
import JoinTopHeader from '~~/components/custom/JoinTopHeader';
import { AddressInput, BlockieAvatar } from "~~/components/scaffold-eth";
import Angle from '~~/components/custom/Angle';
import AngleL from '~~/components/custom/AngleL';
import { useActiveAccount } from "thirdweb/react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import WalletProfileActive from '~~/components/custom/walletProfileActive';
import WalletProfilePast from '~~/components/custom/walletProfilePast';
import { CirclesConfig, Sdk } from '@circles-sdk/sdk';
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers";

const Dot = () => (
  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
);

const DotG = () => (
  <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
);

const DotB = () => (
  <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
);

const DotY = () => (
  <span className="inline-block w-1.5 h-1.5 bg-yellow-200 rounded-full mr-2"></span>
);

const DotRed = () => (
  <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
);

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
  const [isMinting, setIsMinting] = useState(false);
  const [isTrusting, setIsTrusting] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [mintableToken, setMintableToken] = useState(0);
  const [listOfOutgoingTrust, setListOfOutgoingTrust] = useState<string[]>([]);
  const [listOfIncomingTrust, setListOfIncomingTrust] = useState<string[]>([]);
  const [listOfMutualTrust, setListOfMutualTrust] = useState<string[]>([]);
  const [listAnyTrust, setListAnyTrust] = useState<string[]>([]);
  const [inputAddress, setInputAddress] = useState<string>('');
  const [showCircle, setShowCircle] = useState(false);

  let activeAccount = useActiveAccount();
  //let { address: connectedAddress } = useAccount();
  let connectedAddress = activeAccount?.address as `0x${string}` || "0x0000000000000000000000000000000000000000";

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!connectedAddress) return;

      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter, circlesConfig);
      let avatar = await sdk.getAvatar(connectedAddress);

      const mintableToken = await avatar.getMintableAmount();
      setMintableToken(mintableToken);

      const balanceToken = await avatar.getTotalBalance();
      setTotalBalance(balanceToken);

      avatar.getTrustRelations().then((trustRelations) => {
        console.log('Trust relations:', trustRelations);
        trustRelations.forEach((trusted) => {
          if (trusted.relation === 'trustedBy') {
            setListOfIncomingTrust((prev) => [...new Set([...prev, trusted.objectAvatar])]);
            setListAnyTrust((prev) => [...new Set([...prev, trusted.objectAvatar])]);
          } else if (trusted.relation === 'trusts') {
            setListOfOutgoingTrust((prev) => [...new Set([...prev, trusted.objectAvatar])]);
            setListAnyTrust((prev) => [...new Set([...prev, trusted.objectAvatar])]);
          } else if (trusted.relation === 'mutuallyTrusts') {
            setListOfMutualTrust((prev) => [...new Set([...prev, trusted.objectAvatar])]);
            setListAnyTrust((prev) => [...new Set([...prev, trusted.objectAvatar])]);
          }
        });
      });
    };
    fetchAvatar();
  }, [connectedAddress, totalBalance, mintableToken, isMinting, isTrusting]);

  const handleMint = async () => {
    try {
      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter, circlesConfig);
      let avatar = await sdk.getAvatar(connectedAddress);
      setIsMinting(true);
      const mintTransaction = await avatar.personalMint();
      setIsMinting(false);
      console.log('Mint transaction:', mintTransaction);

      const mintableToken = await avatar.getMintableAmount();
      setMintableToken(mintableToken);

      const balanceToken = await avatar.getTotalBalance();
      setTotalBalance(balanceToken);
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };

  const handleTrust = async () => {
    try {
      const adapter = new BrowserProviderContractRunner();
      await adapter.init();
      const sdk = new Sdk(adapter, circlesConfig);
      let avatar = await sdk.getAvatar(connectedAddress);
      
      setIsTrusting(true);
      const trustReceipt = await avatar.trust(inputAddress as `0x${string}`);
      setIsTrusting(false);
      setInputAddress('');
      console.log('Trust receipt:', trustReceipt);
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };

  const { data: equbList } = useScaffoldReadContract({
    contractName: "EthqubFactory",
    functionName: "getDeployedContracts",
    chainId: 11155111,
    watch: true,
  });

  const isArray = Array.isArray(equbList);

  return (
    <div className='profile'>
      <div className="custom-sticky"> 
        <JoinTopHeader />
        <Header />
      </div>

      <div className='profile-banner'>
        <button className="show-circle" onClick={() => setShowCircle(!showCircle)}>
          {showCircle ? "Hide Circle Detail" : "Show Circle Detail"}
        </button>
        <div className='profile-banner-avator'>
          {connectedAddress && <BlockieAvatar address={connectedAddress} size={130}/>}
        </div>
      </div>

      <div className='profile-content'>
        <div className='profile-content-sidebar'>
          <div className='profile-content-sidebar-address'>
            {connectedAddress?.slice(0, 6)}... {connectedAddress?.slice(-6)}
          </div>

          <h1>Total Balance: {totalBalance.toFixed(2)} CRC</h1>
          <h1>Mintable Token: {mintableToken.toFixed(2)} CRC</h1>
          <button onClick={handleMint} className="mint-button" disabled={isMinting}>
            {isMinting ? "Minting..." : "Mint"}
          </button>

          <div className="profile-content-sidebar-form">
            <AddressInput
              name="inviteeAddress"
              value={inputAddress}
              onChange={setInputAddress}
              placeholder="Enter address"
            />
            <button onClick={handleTrust} className="mint-button" disabled={isTrusting}>
              {isTrusting ? "Loading..." : "Trust"}
            </button>
          </div>
        </div> 

        <div className='profile-content-main'>
          {showCircle ? (
            <div className="profile-content-main-cover">
              <div className="profile-content-main-cover-title">
                <h1 className="outgoing-trust trust-title">Outgoing Trust</h1>
                <ul>
                  {listOfOutgoingTrust.map((address, index) => (
                    <div key={index} style={{marginLeft: '10px', color: 'yellow', fontSize: '18px'}}>
                      <DotY/> {address?.slice(0, 6)}... {address?.slice(-6)}
                    </div>
                  ))}
                </ul>
              </div>

              <div className="profile-content-main-cover-title">
                <h1 className="incoming-trust trust-title">Incoming Trust</h1>
                <ul>
                  {listOfIncomingTrust.map((address, index) => (
                    <div key={index} style={{marginLeft: '10px', color: 'blue', fontSize: '18px'}}>
                      <DotB/> {address?.slice(0, 6)}... {address?.slice(-6)}
                    </div>
                  ))}
                </ul>
              </div>

              <div className="profile-content-main-cover-title">
                <h1 className="mutual-trust trust-title">Mutual Trust</h1>
                {listOfMutualTrust.map((address, index) => (
                  <div key={index} style={{marginLeft: '10px', color: 'green', fontSize: '18px'}}>
                    <DotG/> {address?.slice(0, 6)}... {address?.slice(-6)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileP;