'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Quote() {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".quote-content", {
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={ref} className="px-6 py-32 my-5 md:py-44 border border-[#0fff37] rounded-3xl border-t-4">
            <div className="quote-content mx-auto max-w-5xl">
                <div className="mb-8 font-serif text-7xl leading-none text-[#0fff37]/30">
                    “
                </div>

                <h2 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl">
                    Smart way
                    <br />
                    <span className="text-[#0fff37]">to connect.</span>
                </h2>

                <p className="mt-10 max-w-2xl text-lg leading-8 text-white/45">
                    Collaborate seamlessly with your team and connect with your
                    favorite tools. InsightStream integrates with the apps you love,
                    so you can work smarter, not harder.
                </p>

                <div className="mt-10 flex items-center gap-4">
                    <div className="h-px w-10 bg-[#0fff37]" />

                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                        InsightStream
                    </span>
                </div>
            </div>
        </section>
    );
}