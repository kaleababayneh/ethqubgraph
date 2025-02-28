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
 
 
const liskSepolia =  defineChain({
        id: 4202,
        rpc: "https://rpc.sepolia-api.lisk.com"
});


const gnosisChain =  defineChain({
    id : 100,
   rpc: "https://gnosis.drpc.org"
});


const sepolia =  defineChain({
  id: 11155111,
  rpc: "https://gateway.tenderly.co/public/sepolia"
});

const Header = () => {
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const burgerMenuRef = useRef<HTMLDivElement>(null);

      
      let activeAccount = useActiveAccount();
      //let { address: connectedAddress } = useAccount();
      let connectedAddress = activeAccount?.address;
      //let { address: connectedAddress } = useAccount();
      let connectedAddress = activeAccount?.address;
      


    const client = createThirdwebClient({
        clientId: "39e4f1ca58f49dac9fe5a1bdf1bda70b",
      });

      useOutsideClick(
        burgerMenuRef,
        useCallback(() => setIsDrawerOpen(false), []),
      );
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
            <ConnectButton client={client} chains={[gnosisChain, liskSepolia, liskSepolia]} autoConnect= {true} connectButton={{
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
        </div>
    </div>
  )
}

export default Header