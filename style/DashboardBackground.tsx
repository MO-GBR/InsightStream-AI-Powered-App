'use client';

import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DashboardBackground = () => {
    const blob1 = useRef<HTMLDivElement>(null);
    const blob2 = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(blob1.current, {
            x: 200,
            y: -100,
            duration: 35,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
        gsap.to(blob2.current, {
            x: -200,
            y: 150,
            duration: 40,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    });
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
                ref={blob1}
                className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full top-[-100px] left-[-100px]"
            />
            <div
                ref={blob2}
                className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full bottom-[-150px] right-[-150px]"
            />
        </div>
    )
}

export default DashboardBackground