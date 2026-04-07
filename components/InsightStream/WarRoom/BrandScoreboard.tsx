import React from 'react'

type Brand = {
    name: string
    sentiment: number
}
  
const brands: Brand[] = [
    { name: "Your Brand", sentiment: 72 },
    { name: "Competitor A", sentiment: 61 },
    { name: "Competitor B", sentiment: 45 },
];

const BrandScoreboard = () => {
    return (
        <div className='grid grid-cols-3 gap-4'>
            {
                brands.map((brand, index) => (
                    <div key={index} className='card'>
                        <p className='text-sm text-muted-foreground'>{brand.name}</p>
                        <p className='text-3xl font-bold mt-2'>
                            {brand.sentiment}%
                        </p>
                        <p className='text-sm text-muted-foreground mt-1'>
                            Sentiment Score
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default BrandScoreboard