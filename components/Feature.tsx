import { FeatureType } from '@/types'
import Image from 'next/image'
import React from 'react'

const Feature = ({hashtag, title, description, card}: FeatureType) => {
    return (
        <div className='flex-center'>
            <Image
                src={`benefits/card-${card}.svg`}
                alt='card'
                width={350}
                height={350}
            />
            <div className='absolute w-[20%] flex flex-col'>
                <div className={`mb-2 p-2 rounded-full flex items-center gap-1 g-5`}>
                    <p className='font-bold italic text-sm'>#</p>
                    <p className='text-xs'>{hashtag}</p>
                </div>
                <h3 className='text-xl font-bold mb-4'>{title}</h3>
                <p className='text-gray-300 text-xs'>{description}</p>
                <div>
                    <button className='bg-gray-800 rounded-full px-4 py-2 mt-4 text-sm hover:bg-gray-700 transition-colors duration-300'>Learn More</button>
                </div>
            </div>
        </div>
    )
}

export default Feature