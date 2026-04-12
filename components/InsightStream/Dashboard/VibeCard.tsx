'use client';

import gsap from 'gsap';
import React, { useRef, useEffect, useState } from 'react'

const VibeTracker = () => {
    const pathRef = useRef<SVGPathElement>(null);

    const [ data, setData ] = useState([
        0.2, 0.3, 0.1, -0.2, 0.4, 0.5, 0.3
    ]);

    const generatePath = (points:number[]) => {
        const width = 600
        const height = 120
    
        const step = width / (points.length - 1)
    
        return points.map((p,i) => {
            const x = i * step
            const y = height/2 - p * 60
            return `${i===0 ? "M":"L"} ${x} ${y}`
        }).join(" ");
    };

    useEffect(() => {
        if(!pathRef.current) return;

        gsap.fromTo(
            pathRef.current,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration:1.2 }
        )

        gsap.to(pathRef.current,{
            duration:1,
            ease:"power2.out"
        })
    }, [data]);

    return (
        <svg viewBox="0 0 600 120">
            <path
                ref={pathRef}
                d={generatePath(data)}
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    )
};

const VibeCard = () => {
    return (
        <div className="vibe-card">
            <div className="flex justify-between mb-4">
                <h3>Internet Mood</h3>
                <span className="live-indicator">LIVE</span>
            </div>
            <svg className="wave-chart">
                <VibeTracker />
            </svg>
        </div>
    )
}

export default VibeCard