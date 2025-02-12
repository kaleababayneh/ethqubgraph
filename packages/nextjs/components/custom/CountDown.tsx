"use client";
import React from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { size } from 'viem';

const commonStyle = {
    color: 'rgb(236, 236, 236)',
    fontSize: '25px',
};

const labelStyle = {
    color: 'rgb(236, 236, 236)',
    fontSize: '24px',
};

const separatorStyle = {
    height: '0px',
};

interface CountDownProps {
    startsIn: number;
}

const CountDown: React.FC<CountDownProps> = ({ startsIn }) => {
    return (
        <div style={{ 
            transform: 'scale(.65)',
             }}>
                <FlipClockCountdown 
                        to={new Date(Number(startsIn) * 1000)}
                        labelStyle={labelStyle}
                        digitBlockStyle={commonStyle}
                        separatorStyle= {commonStyle}
                        dividerStyle= {separatorStyle}
                        spacing={{
                                clock: 10,
                                digitBlock: 10,
                            }}
                        style={{
                            width: "60px !important",
                            backgroundColor: 'red !important',
                        }}

                 />
        </div>
    )
}

export default CountDown;
