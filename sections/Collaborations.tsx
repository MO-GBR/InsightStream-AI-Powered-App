import Image from 'next/image';
import React from 'react'

const CollaborationsGraph = () => {
    return (
        <div className='flex-center flex-col w-full gap-5 max-lg:w-[70%]'>
            <div className='flex items-center justify-around'>
                <Image
                    src='/collaboration/figma.png'
                    alt='figma'
                    width={30}
                    height={30}
                />
            </div>
            <div className='flex items-center justify-around gap-20'>
                <Image
                    src='/collaboration/notion.png'
                    alt='notion'
                    width={30}
                    height={30}
                />
                <Image
                    src='/collaboration/raindrop.png'
                    alt='raindrop'
                    width={30}
                    height={30}
                />
            </div>
            <div className='flex items-center justify-around gap-20'>
                <Image
                    src='/collaboration/framer.png'
                    alt='framer'
                    width={30}
                    height={30}
                />
                <div className='border border-white rounded-full p-2'>
                    <Image
                        src='/logo.svg'
                        alt='logo'
                        width={30}
                        height={30}
                    />
                </div>
                <Image
                    src='/collaboration/discord.png'
                    alt='discord'
                    width={30}
                    height={30}
                />
            </div>
            <div className='flex items-center justify-around gap-20'>
                <Image
                    src='/collaboration/slack.png'
                    alt='slack'
                    width={30}
                    height={30}
                />
                <Image
                    src='/collaboration/protopie.png'
                    alt='protopie'
                    width={30}
                    height={30}
                />
            </div>
            <div className='flex items-center justify-around'>
                <Image
                    src='/collaboration/photoshop.png'
                    alt='photoshop'
                    width={30}
                    height={30}
                />
            </div>
        </div>
    )
};

const Collaborations = () => {
    return (
        <section id='collab' className='w-full p-5 my-8 flex-center flex-row-reverse max-lg:flex-col-reverse'>
            <div className='w-[70%] max-lg:w-full'>
                <div className='mb-7 g-11 p-5 border rounded-xl shadow-lg'>
                    <h1 className='text-white font-bold'>Smart way to connect.</h1>
                    <p className='text-gray-300 text-sm mt-2'>
                        Collaborate seamlessly with your team and connect with your favorite tools. LVL integrates with the apps you love, so you can work smarter, not harder.
                    </p>
                    <p className='font-bold text-sm text-gray-500 w-full text-end'>- InsightStream -</p>
                </div>
                <div className='g-11 p-5 border w-[80%] max-lg:hidden rounded-xl flex-center shadow-lg'>
                    <CollaborationsGraph />
                </div>
            </div>
            <div>
                <Image
                    src='/roadmap/image-3.png'
                    alt='roadmap'
                    width={500}
                    height={500}
                />
                <p className='font-bold text-3xl'>Improve your productivity</p>
                <p className='text-gray-400'>{'(Unlock The Next LVL)'}</p>
            </div>
        </section>
    )
}

export default Collaborations