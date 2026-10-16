'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}) {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".heading-item", {
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
            });
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={ref}
            className={`max-w-3xl m-5 ${
                align === "center" ? "mx-auto text-center" : ""
            }`}
        >
            {eyebrow && (
                <div className="heading-item mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0fff37]">
                    <span className="h-px w-8 bg-[#0fff37]" />
                    {eyebrow}
                </div>
            )}

            <h2 className="heading-item text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
                {title}
            </h2>

            {description && (
                <p className="heading-item mt-6 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
                    {description}
                </p>
            )}
        </div>
    );
}