import MagneticButton from '@/components/Landing_Page/MagneticButton'
import SectionHeading from '@/components/Landing_Page/SectionHeading'
import { UpcomingFeatures } from '@/constants'
import Image from 'next/image'
import React from 'react'

const NewFeatures = () => {
    return (
        <section className='flex-center flex-col'>
            <SectionHeading
                eyebrow='New Features'
                title='What we’re working on'
                description='Stay updated with the latest features and improvements we are developing for you.'
                align='left'
            />
            <div className='flex-center max-lg:flex-col gap-10'>
                <div className='bg-[#00530e] p-1 rounded-xl max-lg:mx-2'>
                    <div className='bg-black p-5 rounded-xl'>
                        <Image
                            src='/roadmap/image-1.png'
                            alt='Roadmap Image 1'
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
                <div className='max-lg:mx-2'>
                    <div className='bg-[#33cc33] p-3 rounded-full my-5 font-bold text-sm text-center'>#COOKING_MAGIC</div>
                    {
                        UpcomingFeatures.map((feature, index) => (
                            <div key={index}>
                                <h2 className='text-xl font-bold'>{feature.feature}</h2>
                                <p className='text-gray-600 mb-4'>{feature.about}</p>
                            </div>
                        ))
                    }
                    <MagneticButton>Learn More</MagneticButton>
                </div>
            </div>
        </section>
    )
}

export default NewFeatures