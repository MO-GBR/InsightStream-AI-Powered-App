'use client';

import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "../Logo";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dark, setDark] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    const scrollTo = (href: string) => {
        setMobileOpen(false);

        const element = document.querySelector(href);

        element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <header
            className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 transition-all duration-500 ${
                scrolled
                    ? "rounded-2xl border border-white/10 bg-black/70 shadow-2xl shadow-black/30 backdrop-blur-2xl"
                    : "bg-transparent"
            }`}
        >
            <nav className="flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <button
                    onClick={() => scrollTo("#home")}
                    className="group flex items-center gap-3"
                >
                    <Logo square="h-8 w-8" dot="h-2 w-2" />

                    <span className="text-sm font-bold tracking-[0.2em] text-white">
                        INSIGHT<span className="text-[#0fff37]">STREAM</span>
                    </span>
                </button>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-8 lg:flex">
                    {
                        navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollTo(link.href)}
                                className="relative text-xs font-medium uppercase tracking-widest text-white/60 transition-colors duration-300 hover:text-[#0fff37]"
                            >
                                {link.name}
                            </button>
                        ))
                    }
                </div>

                {/* Desktop actions */}
                <div className="hidden items-center gap-2 lg:flex">
                    <button
                        onClick={() => setDark((value) => !value)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#0fff37]/40 hover:text-[#0fff37]"
                        aria-label="Toggle theme"
                    >
                        {dark ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <Link href='/signin' className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition hover:text-white">Sign in</Link>
                    <Link href='/signup' className="group flex items-center gap-2 rounded-full bg-[#0fff37] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#64ff4d]">
                        Sign up
                        <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>

                {/* Mobile button */}
                <button
                    onClick={() => setMobileOpen((value) => !value)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </nav>
            {/* Mobile menu */}
            <div
                className={`overflow-hidden transition-all duration-500 lg:hidden ${
                    mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="border-t border-white/10 p-4">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollTo(link.href)}
                                className="rounded-xl px-4 py-3 text-left text-sm uppercase tracking-wider text-white/60 transition hover:bg-white/5 hover:text-[#0fff37]"
                            >
                                {link.name}
                            </button>
                        ))}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <button className="rounded-xl border border-white/10 py-3 text-xs uppercase tracking-wider text-white/70">Sign in</button>
                            <button className="rounded-xl bg-[#0fff37] py-3 text-xs font-bold uppercase tracking-wider text-black">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}