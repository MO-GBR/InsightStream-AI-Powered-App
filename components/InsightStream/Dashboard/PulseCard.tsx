'use client';

import React from 'react'

import { useRef } from "react"
import gsap from "gsap"

const PulseCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if(!card) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2

        const moveX = (x - centerX) * 0.1
        const moveY = (y - centerY) * 0.1

        gsap.to(card, {
            x: moveX,
            y: moveY,
            duration: 0.4,
            ease: "power3.out"
        })

        gsap.to(".cursor-glow", {
            x: x - 75,
            y: y - 130,
            duration: 0.3,
            ease: "power3.out"
        })
    }

    const handleLeave = () => {
        gsap.to(cardRef.current, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1,0.5)"
        })
    }

    return (
        <div
            ref={cardRef}
            className="pulse-card"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            <div className="flex justify-between mb-4">
                <span className="text-white/80 text-sm">Apple</span>
                <span className="text-emerald-400 text-xs">+4%</span>
            </div>

            <div className='spark-line my-2' />

            <div className="text-xs text-white/60">
                Keyword: iPhone 17
            </div>

            <div className="text-xs text-white/40 mt-1">
                Mentions: 12.3k
            </div>
            <div className="cursor-glow" />
        </div>
    )
}

export default PulseCard