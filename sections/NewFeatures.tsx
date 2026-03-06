import { UpcomingFeatures } from '@/constants'
import Image from 'next/image'
import React from 'react'

const NewFeatures = () => {
    return (
        <section className='flex-center flex-col'>
            <div className='flex-center flex-col my-8'>
                <h1 className='text-violet-800 font-bold'>{'[COMING SOON]'}</h1>
                <h1 className='text-2xl font-mono'>What we're working on</h1>
            </div>
            <div className='flex-center gap-10'>
                <div className='bg-gray-500 p-1 rounded-xl'>
                    <div className='bg-black p-5 rounded-xl'>
                        <Image
                            src='/roadmap/image-1.png'
                            alt='Roadmap Image 1'
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
                <div>
                    <div className='g-9 p-3 rounded-full my-5 font-bold text-sm text-center'>#COOKING_MAGIC</div>
                    {
                        UpcomingFeatures.map((feature, index) => (
                            <div key={index}>
                                <h2 className='text-xl font-bold'>{feature.feature}</h2>
                                <p className='text-gray-600 mb-4'>{feature.about}</p>
                            </div>
                        ))
                    }
                    <button className='p-5 rounded-[5px] bg-violet-700 text-white rounded-tr-3xl'>Learn More</button>
                </div>
            </div>
        </section>
    )
}

export default NewFeatures