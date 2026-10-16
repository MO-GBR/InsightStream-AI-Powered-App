'use client';

import { InsightStreamLinks } from '@/constants'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import gsap from "gsap";
import { useToggleStore } from '@/lib/zustand/ToggleStore';
import Logo from '../Logo';
import { useSession } from 'next-auth/react';
import { ToggleSideBar } from './ToggleMenu';

const Sidebar = () => {
    const pathname = usePathname();

    const { data: session } = useSession();

    const { open } = useToggleStore();

    useEffect(() => {
        gsap.set(
            '.menu',
            {
                x: 300
            }
        )
    }, []);

    return (
        <>
            <div
                className='menu w-[18rem] h-full bg-black border-l border-green-600 fixed top-0 right-0 z-50 max-w-xs shadow-xl p-6'
            >
                <div className='flex-center flex-col p-5'>
                    <div className='flex-center'>
                        <div className="group flex items-center gap-3 bg-[#141414] rounded-[10px]">
                            <Logo square="h-8 w-8" dot="h-2 w-2" />
            
                            <span className="text-sm font-bold tracking-[0.2em] text-white">
                                INSIGHT<span className="text-[#0fff37]">STREAM</span>
                            </span>
                        </div>
                        <ToggleSideBar />
                    </div>
                    <span className='text-green-300'>Hi, {session?.user?.name}</span>
                </div>
                <div className='flex flex-col p-2'>
                    {
                        InsightStreamLinks.map((link, index) => (
                            <a 
                                key={index} 
                                href={link.href} 
                                className={`decoration-0 my-2 p-2 rounded-2xl hover:bg-gray-700 ${pathname === link.href ? 'bg-green-300 text-black font-bold' : 'text-white'}`}
                            >
                                {link.name}
                            </a>
                        ))
                    }
                </div>
            </div>
            { open && <div className='fixed inset-0 z-40 bg-black/50 pointer-events-none' /> }
        </>
    )
}

export default Sidebar