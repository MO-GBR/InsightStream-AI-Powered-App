'use client';

import React from 'react'

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ProjectType, SentimentData } from '@/types';
import { useProjectStore } from '@/lib/zustand/ProjectStore';

const PulseCard = ({ project }: { project: ProjectType }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<unknown[]>([]);
    const [sentiment, setSentiment] = useState<SentimentData | null>(null);

    const isCurrent = project.id === useProjectStore.getState().currentProject?.id;

    const { setCurrentProject } = useProjectStore();

    useEffect(() => {
        fetch(`/api/mentions/${project.id}`)
            .then(res => res.json())
            .then(data => {
                setData(data.mentions);
                setSentiment(data.sentiment);
            })
            .catch(err => console.error("Error fetching mentions:", err));
        
        console.log('Sentiment data:', sentiment);
    }, [project.id]);

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
            className={`pulse-card ${isCurrent ? 'border-emerald-400/80 bg-green-900' : 'border-white/20 bg-black/20'}`}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onClick={() => setCurrentProject(project)}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-white/80 text-sm">{project.name}</span>
                <span className="text-emerald-400 text-xs">{sentiment?.sentiment}</span>
            </div>

            <div className='spark-line my-2' />

            <div className="text-xs text-white/60">
                Keyword: {project.keyword}
            </div>

            <div className="text-xs text-white/40 mt-1">
                Mentions: {data?.length}
            </div>
            {
                isCurrent && (
                    <div className="absolute bottom-2 right-2 text-xs text-emerald-400 border p-1 rounded-full">
                        Current
                    </div>
                )
            }
            <div className="cursor-glow" />
        </div>
    )
}

export default PulseCard