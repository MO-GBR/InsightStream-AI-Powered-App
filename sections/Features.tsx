import Feature from '@/components/Feature'
import Heading from '@/components/Heading'
import { FeaturesData } from '@/constants'
import React from 'react'

const Features = () => {
    return (
        <div className='w-full flex-center gap-10 flex-col'>
            <Heading
                text='Work Smarter. Not Harder. Take your productivity to the next LVL.'
            />
            <div className='flex-center w-full'>
                <div className='grid grid-cols-3 gap-3 w-full max-lg:grid-cols-1'>
                    {
                        FeaturesData.map((feature, index) => (
                            <Feature
                                key={index}
                                hashtag={feature.hashtag}
                                title={feature.title}
                                description={feature.description}
                                card={`${index + 1}`}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Features