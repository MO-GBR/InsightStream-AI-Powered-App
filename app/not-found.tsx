import Image from 'next/image'
import React from 'react'

const notFound = () => {
    return (
        <div className='w-full h-screen flex-center'>
            <Image
                src='/roadmap/image-2.png'
                alt='Not Found'
                width={500}
                height={500}
            />
            <div>
                <div className='mb-6 flex items-center gap-2'>
                    <Image
                        src='/logo.svg'
                        alt='Logo'
                        width={50}
                        height={50}
                    />
                    <p className='font-bold font-mono'>InsightSream</p>
                </div>
                <h1 className='text-2xl font-bold'>404 - Page Not Found</h1>
                <p className='text-gray-600 mt-4'>Sorry, the page you're looking for doesn't exist.</p>
                <a className='mt-6 inline-block px-6 py-3 bg-violet-700 text-white rounded-tr-3xl hover:bg-violet-500 transition-colors duration-300' href='/'>
                    Head Back to the Homepage
                </a>
            </div>
        </div>
    )
}

export default notFound