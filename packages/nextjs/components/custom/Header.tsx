"use client";
import React from 'react'
import Logo from './Logo'
import { BlockieAvatar, FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useRef, useState } from "react";
import { useCallback } from "react";
import { createThirdwebClient } from "thirdweb"
import { defineChain } from "thirdweb/chains";
import { useAccount } from "wagmi";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { useEffect } from "react";


import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
 
 
import { CirclesConfig, Sdk } from '@circles-sdk/sdk';
import {BrowserProviderContractRunner} from "@circles-sdk/adapter-ethers";

// const liskSepolia =  defineChain({
//         id: 4202,
//         rpc: "https://rpc.sepolia-api.lisk.com"
// });

const gnosisChain =  defineChain({
    id : 100,
   rpc: "https://gnosis.drpc.org"
});

const sepolia =  defineChain({
  id: 11155111,
  rpc: "https://gateway.tenderly.co/public/sepolia"
});


export const circlesConfig: CirclesConfig = {
  circlesRpcUrl: "https://static.94.138.251.148.clients.your-server.de/rpc/",
  v1HubAddress: "0x29b9a7fbb8995b2423a71cc17cf9810798f6c543",
  v2HubAddress: "0x3D61f0A272eC69d65F5CFF097212079aaFDe8267",
  migrationAddress: "0x28141b6743c8569Ad8B20Ac09046Ba26F9Fb1c90",
  nameRegistryAddress: "0x8D1BEBbf5b8DFCef0F7E2039e4106A76Cb66f968",
  baseGroupMintPolicy: "0x79Cbc9C7077dF161b92a745345A6Ade3fC626A60",
  profileServiceUrl: "https://static.94.138.251.148.clients.your-server.de/profiles/",
};


const Header = () => {
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const burgerMenuRef = useRef<HTMLDivElement>(null);

      
      let activeAccount = useActiveAccount();
      //let { address: connectedAddress } = useAccount();
      let connectedAddress = activeAccount?.address.toLocaleLowerCase() || "";
      
      const [totalBalance, setTotalBalance] = useState(0);
      


    const client = createThirdwebClient({
        clientId: "39e4f1ca58f49dac9fe5a1bdf1bda70b",
    });

    const wallets = [
      inAppWallet({
        auth: {
          options: [
            "google",
            "farcaster",
            "email",
            "x",
            "passkey",
            "phone",
            "telegram",
            "apple",
          ],
        },
      }),
      createWallet("io.metamask"),
      createWallet("com.coinbase.wallet"),
      createWallet("me.rainbow"),
      createWallet("io.rabby"),
      createWallet("io.zerion.wallet"),
    ];

      useOutsideClick(
        burgerMenuRef,
        useCallback(() => setIsDrawerOpen(false), []),
      );


    
      useEffect(() => {
        const fetchAvatar = async () => {
      
    
        const adapter = new BrowserProviderContractRunner();
            await adapter.init();
            const sdk = new Sdk(adapter,  circlesConfig);
            let avatar = await sdk?.getAvatar(connectedAddress  as `0x${string}`);

            const balanceToken = await avatar.getTotalBalance();
            setTotalBalance(balanceToken);
      
        
            };
          
          fetchAvatar();
        }, [connectedAddress, setTotalBalance]);
      
  return (
    <div className='custom-header'>
        
        <div className='custom-header-left'>
            <div className='custom-header-left-join'>
                <a href='/join'>Join equb</a>
            </div>

            <div className='custom-header-left-create'>
                <a href='/create'>Create equb</a>
            </div>
        </div>

        <div className='custom-header-center'>
            <a href='/'> <Logo /></a>
        </div>

        <div className='custom-header-right'>
             {/* <RainbowKitCustomConnectButton /> */}
            <ConnectButton client={client} chains={[gnosisChain, sepolia]} wallets={wallets} autoConnect= {true} connectButton={{
                 label: "Connect Wallet",
                 className: "my-custom-class",
                 style: {
                    backgroundColor: "rgb(20, 20, 20)",
                    color: "rgb(236, 236, 236)",
                    fontSize: "19px",
                    fontWeight: "500",
                    fontFamily: "var(--font-anek-bangla)",
                 },
            }}
             />
            <FaucetButton /> 

             {connectedAddress &&  <div className='custom-header-avatar'>
              <a href="/profile">
              <BlockieAvatar address={connectedAddress || ''} size={35} />
              </a>
            </div>}

            {connectedAddress && <div className='custom-header-crc'>
              <a href="/profile">
                {totalBalance.toFixed(0)} CRC
              </a>
              </div>
            }
        </div>
    </div>
  )
}

export default Header