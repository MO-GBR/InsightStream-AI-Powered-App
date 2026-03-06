import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section id='hero' className='min-h-screen flex-center gap-10 flex-col'>
            <h1 className="text-4xl mb-6 mt-20">
                Explore the Possibilities of&nbsp;AI&nbsp;Chatting with {` `}
                <span className="inline-block relative font-mono">
                    InsightStream{" "}
                    <img
                        src="/hero/curve.png"
                        className="absolute top-full left-0 w-full xl:-mt-2"
                        width={624}
                        height={28}
                        alt="Curve"
                    />
                </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl text-center">
                Unleash the power of AI within InsightStream. Upgrade your productivity
                with InsightStream, the open AI chat app.
            </p>
            <div className='border-2 border-white p-3 w-[20%] text-center bg-transparent rounded rounded-tr-3xl font-bold cursor-pointer z-10'>Get Started</div>
            <div className='g-1 rounded-2xl pt-3 p-0.5 w-fit mb-[100px]'>
                <div className='flex items-center justify-start g-3 p-2 w-fit rounded-tl-2xl gap-3 ml-4 rounded-tr-2xl'>
                    <div className='dot bg-red-600' />
                    <div className='dot bg-yellow-600' />
                    <div className='dot bg-green-600' />
                </div>
                <Image
                    src="/hero/Hero.jpg"
                    alt="Hero Image"
                    className="img w-[51vw] rounded-2xl"
                    width={1024}
                    height={490}
                />
                <div className='flex items-center justify-between w-[60vw] absolute top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex items-center gap-4 bg-gray-800 mb-[80px] animate-bounce rounded-2xl p-4 w-fit h-fit shadow-xl'>
                        <Image
                            src='/notification/image-1.png'
                            className='rounded-xl'
                            width={50}
                            height={50}
                            alt='badge-1'
                        />
                        <div className='flex flex-col'>
                            <p className='font-bold -ml-2'>AI-Powered</p>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center'>
                                    {
                                        ["/notification/image-2.png", "/notification/image-3.png", "/notification/image-4.png"].map((src, index) => (
                                            <Image
                                                key={index}
                                                src={src}
                                                className={`border rounded-full z-${index + 1} border-gray-300 -ml-2`}
                                                width={30}
                                                height={30}
                                                alt={`badge-${index + 2}`}
                                            />
                                        ))
                                    }
                                </div>
                                <span className='text-sm text-gray-300'>Join 10k+ users</span>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-2xl p-4 animate-bounce w-fit h-fit shadow-xl flex-center gap-3 mt-[100px]'>
                        {
                            ["/file-02.svg", "/chrome-cast.svg", "/home-smile.svg", "/plus-square.svg"].map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    className="animate-pulse"
                                    width={30}
                                    height={30}
                                    alt={`icon-${index + 1}`}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <Image src="/pricing/stars.svg" alt='stars' width={2000} height={2000} className='absolute -z-10' />
        </section>
    )
}

export default Hero