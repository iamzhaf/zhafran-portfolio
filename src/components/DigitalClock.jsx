import React from "react";
import { useState, useEffect } from "react";

export default function DigitalClock() {
    const [time, setTime] = useState(new Date());


    const formatTime = (time) => {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let am_pm = hours >= 12 && hours < 24 ? "PM" : "AM";

        hours = hours % 12 || 12;

        minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if minutes is less than 10
        
        seconds = seconds < 10 ? "0" + seconds : seconds; // Add leading zero if seconds is less than 10

        return `${hours}:${minutes}:${seconds} ${am_pm}`;
    };
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h1 className="text-7xl font-semibold font-mono text-gray-300 text-shadow-lg/30 tracking-widest ">{formatTime(time)}</h1>
        </div>
    );
}