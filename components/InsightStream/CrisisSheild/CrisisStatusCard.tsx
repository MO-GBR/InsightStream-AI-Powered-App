'use client';

import { cn } from '@/lib/utils';
import { AlertType } from '@/types';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const riskStyles = {
    LOW: {
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    MEDIUM: {
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    HIGH: {
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
};

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

interface CrisisStatusCardProps {
    risk: string;
    spike: string;
    message?: string;
};

const CrisisStatusCard = ({ risk, mentionsSpike, message }: AlertType) => {
    const style = riskStyles[risk as RiskLevel]

    const cardRef = useRef<HTMLDivElement>(null);

    let Glow: string;
    if(risk === 'HIGH') Glow = '0 0 25px rgba(244,63,94,0.4)';
    if(risk === 'MEDIUM') Glow = '0 0 25px rgba(255, 238, 0, 0.4)';
    if(risk === 'LOW') Glow = '0 0 25px rgba(9, 255, 0, 0.644)';

    useEffect(() => {
        gsap.to(cardRef.current, {
            boxShadow: Glow,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut"
        })
    }, [risk]);

    return (
        <div className={
            cn(
                "relative rounded-xl border border-gray-900 m-5 p-8 overflow-hidden",
                style.bg
            )
        } ref={cardRef}>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🚨</span>
                <h2 className="font-semibold">Crisis Shield Status</h2>
            </div>
  
            <div className={
                cn(
                    "text-4xl font-bold tracking-tight",
                    style.color
                )
            }>
                {risk} RISK
            </div>
  
            <p className="mt-4 text-muted-foreground">
                Negative sentiment increased by{" "}
                <span className="font-semibold">
                    {mentionsSpike}
                </span>{" "}
                in the last 15 minutes.
            </p>
  
            <div className="mt-6 text-sm text-muted-foreground">
                Sources: RSS(News) • Reddit • Reviews
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
                Last scan: 30 minutes ago
            </div>
        </div>
    )
}

export default CrisisStatusCard