import React from 'react'

const PricingPlan = ({ name, price, features}: {
    name: string;
    price: number;
    features: string[];
}) => {
    return (
        <div className={`flex-center g-3 p-0.5 rounded-xl`}>
            <div className='bg-black p-3 rounded-xl h-[23rem]'>
                <p className='text-violet-800 font-bold text-center text-3xl'>{name}</p>
                <h2 className='text-xl font-bold text-center mb-5'>${price}/month</h2>
                <hr />
                <ul className='my-4'>
                    {features.map((feature, index) => (
                        <li key={index} className='flex items-center gap-2 mb-2'>
                            <span className='text-green-500'>✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>
                <button className='bg-gray-800 rounded-full px-4 py-2 mt-4 text-sm hover:bg-gray-700 transition-colors duration-300 w-full'>Choose Plan</button>
            </div>
        </div>
    )
}

export default PricingPlan