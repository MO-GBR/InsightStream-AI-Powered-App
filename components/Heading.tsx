import Image from 'next/image';
import React from 'react'

const Heading = ({ text }: { text: string }) => {
    return (
        <div className='flex-center gap-6 flex-col my-10'>
            <h2 className='text-3xl font-mono w-[80%] text-center'>{text}</h2>
        </div>
    )
}

export default Heading