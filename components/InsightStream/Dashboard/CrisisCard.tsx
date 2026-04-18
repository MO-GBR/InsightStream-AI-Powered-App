'use client';

import React, { useEffect, useRef } from 'react'
import gsap from "gsap"
import { useProjectStore } from '@/lib/zustand/ProjectStore';
import { AlertType } from '@/types';

const CrisisCard = ({ mentionsSpike, topKeyword }: AlertType) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(cardRef.current, {
            boxShadow: "0 0 25px rgba(244,63,94,0.4)",
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut"
        })
    }, []);
    return (
        <div ref={cardRef} className="crisis-card">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-rose-400">🚨</span>
                <span className="text-white font-medium">Crisis Detected</span>
                <div className='w-[8px] h-[8px] bg-[#f43f5e] rounded-full animate-pulse' />
            </div>
            <p className="text-xs text-white/60 mt-3">
                Top keyword:
            </p>
            <p className="text-sm text-white border border-red-700 rounded-[10px] w-fit m-1 p-2">
                {topKeyword}
            </p>
            <p className="text-xs text-white/40 mt-4">
                Mentions spike: {mentionsSpike}
            </p>
        </div>
    )
}

export default CrisisCard