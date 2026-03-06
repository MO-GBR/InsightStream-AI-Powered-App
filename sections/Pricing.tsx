import Heading from '@/components/Heading'
import PricingPlan from '@/components/PricingPlan'
import { PricingPlans } from '@/constants'
import React from 'react'

const Pricing = () => {
    return (
        <div className='flex-center flex-col w-full'>
            <Heading
                icon='/file-02.svg'
                title='Pricing'
                subTitle='Choose the plan that fits your needs and unlock the full potential of our app.'
            />
            <div className='flex justify-center items-start gap-3'>
                {
                    PricingPlans.map((plan, index) => (
                        <PricingPlan
                            key={index}
                            g={`${index + 1}`}
                            name={plan.name}
                            price={plan.price}
                            features={plan.features}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Pricing