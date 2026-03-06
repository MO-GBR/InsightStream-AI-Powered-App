'use client';

import { NavLinks } from '@/constants'
import Image from 'next/image'
import React from 'react'
import { useScroll } from '../hooks/useScroll'


const Navbar = () => {
    const [{ scrollY }] = useScroll();

    return (
        <header className={`flex items-center justify-between p-2 px-10 ${
            scrollY > 50 ? 'bg-gray-900/80 backdrop-blur-sm border-b border-gray-700' : 'bg-transparent'
        }`}>
            <nav className='flex-center'>
                <div className='flex-center'>
                    <Image src='/logo.svg' alt='logo' width={30} height={30} />
                    <span className='text-lg font-bold text-white font-mono'>InsightStream</span>
                </div>
                <ul className='flex items-center gap-6 ml-10'>
                    {
                        NavLinks.map((link, index) => (
                            <li key={index}>
                                <a className='decoration-0 cursor-pointer font-bold text-white hover:text-gray-300' href={link.href}>
                                    {link.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className='flex-center gap-4'>
                <a className='btn border p-2 hover:bg-gray-400 decoration-0' href='/signin'>Sign In</a>
                <a className='btn p-2 bg-violet-700 hover:bg-violet-500 rounded-tr-3xl px-7 decoration-0' href='/signup'>Sign Up</a>
            </div>
        </header>
    )
}

export default Navbar