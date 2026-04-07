'use client';

import { InsightStreamLinks } from '@/constants'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className='w-[15rem] h-full bg-gray-900 border-r'>
            <div className='flex-center gap-2 bg-gray-700 my-5 mx-2 p-2 rounded-2xl'>
                <Image src="/logo.svg" alt='logo' width={30} height={30} />
                <p className='font-bold font-mono'>InsightStream</p>
            </div>
            <div className='flex flex-col p-2'>
                {
                    InsightStreamLinks.map((link, index) => (
                        <a 
                            key={index} 
                            href={link.href} 
                            className={`text-white decoration-0 my-2 p-2 rounded-2xl hover:bg-gray-700 ${pathname === link.href ? 'bg-gray-700' : ''}`}
                        >
                            {link.name}
                        </a>
                    ))
                }
            </div>
            <div className='my-5 mx-2 rounded-2xl p-3 bg-gray-700'>
                {
                    [
                        {
                            title: 'Setting',
                            href: '/setting',
                            icon: '/icons/sliders-04.svg'
                        },
                        {
                            title: 'Account',
                            href: '/account',
                            icon: '/icons/white-person.svg'
                        }
                    ].map((link, index) => (
                        <a key={index} href={link.href} className='flex-center gap-2 p-1 hover:bg-gray-600 rounded-2xl my-1'>
                            <Image src={link.icon} alt={link.title} width={30} height={30} />
                            <p className='font-mono'>{link.title}</p>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar