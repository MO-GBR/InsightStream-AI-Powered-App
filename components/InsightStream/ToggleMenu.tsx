'use client';

import React from 'react'
import { Sparkles } from 'lucide-react';
import { useToggleStore, useToggleMenuStore } from '@/lib/zustand/ToggleStore';
import gsap from "gsap";

export const ToggleSideBar = () => {
    const { open: openSideMenu, toggle: toggleSideMenu } = useToggleStore();

    const handleMenu = () => {
        const tl = gsap.timeline({
            onStart: () => toggleSideMenu()
        });

        tl.to(
            '.menu',
            { x: openSideMenu ? 300 : 0 }
        )
    };
    return (
        <div className='text-xl text-white transition-colors cursor-pointer border border-green-600 rounded-full p-2 m-2 hover:text-[#0fff37]' onClick={handleMenu}>
            <Sparkles />
        </div>
    )
};

const ToggleMenu = () => {
    const { toggle: toggleCommandMenu } = useToggleMenuStore();

    return (
        <>
            <ToggleSideBar />
            <div className="border rounded-xl p-3 border-green-600 text-sm text-muted-foreground" onClick={() => toggleCommandMenu()}>
                ⌘K Click <span className="p-1 bg-green-800 text-white rounded-[10px] m-1">Ctrl K</span> to display command palette
            </div>
        </>
    )
}

export default ToggleMenu