import Heading from '@/components/Heading'
import PricingCard from '@/components/Landing_Page/PricingCard'
import SectionHeading from '@/components/Landing_Page/SectionHeading'
import PricingPlan from '@/components/PricingPlan'
import { PricingPlans } from '@/constants'
import React from 'react'

const Pricing = () => {
    return (
        <div className='flex-center flex-col w-full'>
            <SectionHeading
                eyebrow='Pricing'
                title='Choose the plan that fits your needs and unlock the full potential of our app.'
                description='Select the perfect plan for your business and take advantage of all the features we have to offer.'
                align='center'
            />
            <div className='flex justify-center items-start gap-3 max-lg:flex-col'>
                {
                    PricingPlans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            features={plan.features}
                            popular={plan.popular}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Pricing