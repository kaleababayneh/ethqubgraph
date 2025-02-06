import React from 'react'
import { useEffect } from 'react'

interface EqubDetailEachEveryProps {
    equbDetailsEach: any;
}

const EqubDetailEachEvery: React.FC<EqubDetailEachEveryProps> = ({ equbDetailsEach }) => {


    useEffect(() => {
        if (equbDetailsEach) {
            console.log("WE ARE HERE", equbDetailsEach);
        }
    }, [equbDetailsEach]);

    if (!equbDetailsEach) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div>xxx{equbDetailsEach}</div>
            {/* {equbDetailsEach.map((detail, index) => (
              <div key={index}>
                    <p><strong>Title:</strong> {detail}</p>

                    {/* <p><strong>Creation Time:</strong> {new Date(detail[1].mul(1000)).toLocaleString()}</p>
                    <p><strong>Starting Time:</strong> {new Date(detail[2] * 1000).toLocaleString()}</p>
                    <p><strong>Cycle Start Time:</strong> {new Date(detail[3] * 1000).toLocaleString()}</p>
                    <p><strong>Last Time Stamp:</strong> {new Date(detail[4] * 1000).toLocaleString()}</p> 
                    {/* <p><strong>Pool Amount:</strong> {detail[5]}</p>
                    <p><strong>Individual Contribution:</strong> {detail[6]}</p>
                    <p><strong>Current Cycle:</strong> {detail[7]}</p>
                    <p><strong>Total Cycles:</strong> {detail[8]}</p>
                    <p><strong>Cycle Duration:</strong> {detail[9]}</p>
                    <p><strong>Number of Members:</strong> {detail[10]}</p> *
                </div>
            ))} */}
        </div>
    )
}

export default EqubDetailEachEvery;