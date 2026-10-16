'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const logos = [
    "REDDIT",
    "SLACK",
    "DISCORD",
    "NOTION",
    "GOOGLE",
    "HUBSPOT",
    "OPENAI",
];

export default function LogoMarquee({ logos }: { logos: string[] }) {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;

        if (!track) return;

        const ctx = gsap.context(() => {
            gsap.to(track, {
                xPercent: -50,
                duration: 25,
                repeat: -1,
                ease: "none",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="overflow-hidden border-y border-white/10 py-10">
            <div className="mb-7 text-center font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-white/30">
                Integrates with the tools you already use
            </div>

            <div className="relative flex overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex w-max items-center gap-16 pr-16"
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={`${logo}-${index}`}
                            className="group flex min-w-[130px] items-center justify-center"
                        >
                            <Image
                                src={logo}
                                alt={logo}
                                width={50}
                                height={50}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}