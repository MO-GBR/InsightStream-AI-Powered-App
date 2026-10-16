import Feature from '@/components/Feature'
import SectionHeading from '@/components/Landing_Page/SectionHeading'
import ServiceCard from '@/components/Landing_Page/ServiceCard'
import { FeaturesData } from '@/constants'
import React from 'react'

const Features = () => {
    return (
        <div className='w-full flex-center gap-10 flex-col'>
            <SectionHeading
                eyebrow='Features'
                title='Work Smarter. Not Harder. Take your productivity to the next LVL.'
                description='InsightStream is a powerful AI chat app that helps you to get things done faster and smarter. With InsightStream, you can easily manage your tasks, projects, and team members in one place.'
            />
            <div className='flex-center w-full'>
                <div className='grid grid-cols-3 gap-3 w-full max-lg:grid-cols-1'>
                    {
                        FeaturesData.map((feature, index) => (
                            <ServiceCard
                                key={index}
                                number={index + 1}
                                hashtag={feature.hashtag}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Features