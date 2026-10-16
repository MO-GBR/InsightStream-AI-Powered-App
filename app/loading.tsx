import Logo from '@/components/Logo'
import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-screen flex-center flex-col'>
            <Logo square="h-20 w-20" dot="h-6 w-6" />
            <div className="text-2xl font-black mt-5 tracking-[-0.07em] text-white md:text-5xl">
                INSIGHT<span className="text-[#0fff37]">STREAM</span>
            </div>
            <p className='text-gray-700'>Loading ......</p>
        </div>
    )
}

export default Loading