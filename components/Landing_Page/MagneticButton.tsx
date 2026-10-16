'use client';

import { useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({
    children = "Get started",
    className = "",
    onClick = () => {},
}: {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;

        if (!button) return;

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.18,
            y: y * 0.18,
            duration: 0.4,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.35)",
        });
    };

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden rounded-full bg-[#0fff37] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors duration-300 hover:bg-[#64ff4d] ${className}`}
        >
            <span className="relative z-10 flex items-center gap-3">
                {children}

                <span className="text-lg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                </span>
            </span>

            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
        </button>
    );
}