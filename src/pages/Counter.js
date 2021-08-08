import React, { useState } from 'react'
import useOdometer from 'use-odometer';

function Counter({initialValue, rate}) {
    const [count,setCount] = React.useState(initialValue)

    const targetRef = React.useRef(null);
    useOdometer(targetRef, count, {
        format: "(,ddd).dddd"
    });

    const interestEarnedIn2Seconds = rate * 2

    React.useEffect(() => {
        const timer = setTimeout(() => {
          setCount(count + interestEarnedIn2Seconds);
        }, 2000);
        return () => clearTimeout(timer);
    });
    
    return (
        <div>
            <p>Normal: {count} </p>
            <p>Normal: {count} </p>
            <p>Animation: </p> 
            <p className="target" ref={targetRef} />
        </div>
    )
}

export default Counter
