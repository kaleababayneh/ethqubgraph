import React from 'react'
import Image from 'next/image'
import WaveyIcon from './WaveyIcon'
import Logo from './Logo'

const HomeBody = () => {
  return (
    <>
    <div className='custom-homebody'>
        <div className='custom-homebody-title climate-crisis'>
            Revolutionizing Community Lending with Blockchain
        </div>
        <div className='custom-homebody-subtitle'>
            On-chain reputation based under-collateralized community lending.
        </div>
        <div className='custom-homebody-content'>
        <div className='custom-homebody-content-join'>
                <a href='/'>Join Equb</a>
            </div>

            <div className='custom-homebody-content-create'>
                <a href='/'>Create Equb</a>
            </div>
        </div>
    </div>
    <div className='custom-homebody2'>

        <div className='custom-homebody2-side'>
           <Image src='/ethqub.png' alt='Equb' width='515' height='720' />
        </div>

        <div className='custom-homebody2-main'>
            <div className='custom-homebody2-main-title'>
                What is Equb?
            </div>
            <div className='custom-homebody2-main-content'>
                Equb is a traditional Ethiopian rotating savings and credit system where members contribute money regularly, and one member receives the pooled funds each round.
            </div>
        </div>
      
    </div>
    <div className='custom-homebody3'>
        <div className='custom-homebody3-content'>
            <div className='custom-homebody3-content-title'>
                Why Ethqub?
            </div>
            <div className='custom-homebody3-content-description'>
                Equb is a traditional Ethiopian rotating savings and credit system where members contribute money regularly, and one member receives the pooled funds each round.            </div>
        </div>
        <div className='custom-homebody3-waveyIcon'>
            <WaveyIcon />
        </div>
        <div className='custom-homebody3-waveyIcon custom-homebody3-waveyIconCover'>
            xx
        </div>
        <div className='custom-homebody3-placeholder'>
        </div>

        <div className='custom-homebody3-main'>
            <div className='custom-homebody3-main-title'>
                <Logo />
            </div>

            <div className='custom-homebody3-main-content'>
                Born in Ethiopia Build in ETHiopia 
            </div>

            <div className='custom-homebody3-main-subtitle'>
                Contact to contribute ETHqub | kaleab@node101.io
            </div>
            
        </div>
    </div>
    </>
  )
}

export default HomeBody