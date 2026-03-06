import Image from 'next/image';
import React from 'react'

const Heading = ({ title, icon, subTitle }: { title: string; icon: string; subTitle: string; }) => {
    return (
        <div className='flex-center gap-6 flex-col my-10'>
            <div className='g-4 p-1 w-fit rounded-full'>
                <div className='g-3 p-2 flex-center gap-3 w-fit rounded-full'>
                    <Image
                        src={icon}
                        alt={title}
                        height={20}
                        width={20}
                    />
                    <h1>{title}</h1>
                </div>
            </div>
            <h2 className='text-3xl font-mono w-[80%] text-center'>{subTitle}</h2>
        </div>
    )
}

export default Heading