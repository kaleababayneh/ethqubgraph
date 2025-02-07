import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <div className='custom-header'>
        
        <div className='custom-header-left'>
            <div className='custom-header-left-join'>
                <a href='/'>Join equb</a>
            </div>

            <div className='custom-header-left-create'>
                <a href='/'>Create equb</a>
            </div>
        </div>

        <div className='custom-header-center'>
            <Logo />
        </div>

        <div className='custom-header-right'>
            Connect Wallet
        </div>
    </div>
  )
}

export default Header