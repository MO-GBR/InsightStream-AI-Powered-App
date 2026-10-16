'use client';

import { useRef } from "react";
import gsap from "gsap";
import { AudioWaveform, Shield, MousePointerClick, BookOpenText, AudioLines, Brain } from 'lucide-react';

export default function ServiceCard({
    number,
    hashtag,
    title,
    description,
}: {
    number: number;
    hashtag: string;
    title: string;
    description: string;
}) {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gsap.to(card, {
            "--mouse-x": `${x}px`,
            "--mouse-y": `${y}px`,
            duration: 0.2,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group relative min-h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#0fff37]/40 hover:bg-white/[0.045] m-5"
        >
            {/* Mouse glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                    "radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(15,255,55,0.10), transparent 70%)",
                }}
            />

            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/30">{number}</span>
                    <span className="text-xl text-white/30 transition-colors group-hover:text-[#0fff37]">
                        {number === 1 && <AudioWaveform />}
                        {number === 2 && <Shield />}
                        {number === 3 && <MousePointerClick />}
                        {number === 4 && <BookOpenText />}
                        {number === 5 && <AudioLines />}
                        {number === 6 && <Brain />}
                    </span>
                </div>
                <div className="mt-12">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#64ff4d]">{hashtag}</span>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">{title}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">{description}</p>
                </div>

                <div className="mt-auto pt-10">
                    <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/60 transition-colors group-hover:text-[#0fff37]">
                        Learn more
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-full border-l border-t border-[#0fff37]/10 transition-all duration-500 group-hover:border-[#0fff37]/30" />
        </div>
    );
}