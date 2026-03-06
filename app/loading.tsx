import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-screen flex-center flex-col'>
            <Image
                src='/logo.svg'
                alt='Loading'
                width={300}
                height={300}
            />
            <p className='font-bold text-3xl font-mono'>InsightStream</p>
            <p className='text-gray-700'>Loading ......</p>
        </div>
    )
}

export default Loading