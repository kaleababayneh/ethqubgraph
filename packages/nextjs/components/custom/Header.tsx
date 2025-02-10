"use client";
import React from 'react'
import Logo from './Logo'
import { BlockieAvatar, FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useRef, useState } from "react";
import { useCallback } from "react";
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb"
import { defineChain } from "thirdweb/chains";
 
 
const liskSepolia =  defineChain({
        id: 4202,
        rpc: "https://rpc.sepolia-api.lisk.com"
});


const Header = () => {
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const burgerMenuRef = useRef<HTMLDivElement>(null);


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
             <RainbowKitCustomConnectButton />
            {/* <ConnectButton client={client} chains={[liskSepolia]} autoConnect= {true} connectButton={{
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
             /> */}
            <FaucetButton /> 
            <div>
              <a href="/profile">
              <BlockieAvatar address="vitalik.eth" size={38} />
              </a>
            </div>
        </div>
    </div>
  )
}

export default Header