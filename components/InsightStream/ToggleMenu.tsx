'use client';

import React from 'react'
import { ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react';
import { useToggleStore, useToggleMenuStore } from '@/lib/zustand/ToggleStore';
import gsap from "gsap";

const ToggleMenu = () => {
    const { open: openNavMenu, toggle: toggleNavMenu } = useToggleStore();
    const { open: openCommandMenu, toggle: toggleCommandMenu } = useToggleMenuStore();

    const handleMenu = () => {
        const tl = gsap.timeline({
            onStart: () => toggleNavMenu()
        });

        tl.to(
            '.menu',
            { x: openNavMenu ? 250 : 0 }
        )
    };

    return (
        <>
            <div
                className='border rounded-[10px] p-1 px-2 m-1 cursor-pointer hover:bg-gray-500 flex-center'
                onClick={handleMenu}
            >
                {
                    openNavMenu
                        ? (
                            <>
                                <ArrowBigLeftDash />
                                <p>Close</p>
                            </>
                        )
                        : (
                            <>
                                <ArrowBigRightDash />
                                <p>Open</p>
                            </>
                        )
                }
            </div>
            <div className="border rounded-xl pl-3 py-2 text-sm text-muted-foreground" onClick={() => toggleCommandMenu()}>
                Search...    ⌘K <span className="ml-7 p-1 bg-gray-700 rounded-[10px] m-1">Ctrl K</span>
            </div>
        </>
    )
}

export default ToggleMenu