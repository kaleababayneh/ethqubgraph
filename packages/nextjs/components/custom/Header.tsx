"use client";
import React from 'react'
import Logo from './Logo'
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useRef, useState } from "react";
import { useCallback } from "react";

const Header = () => {
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const burgerMenuRef = useRef<HTMLDivElement>(null);
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
            <Logo />
        </div>

        <div className='custom-header-right'>
             <RainbowKitCustomConnectButton />
             <FaucetButton /> 
        </div>
    </div>
  )
}

export default Header