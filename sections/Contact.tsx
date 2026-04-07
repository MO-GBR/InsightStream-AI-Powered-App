import Image from 'next/image'
import React from 'react'

const Contact = () => {
    return (
        <section className='flex-center flex-col my-10 border rounded-2xl p-5 mx-8 g-11'>
            <div className='flex-center gap-10'>
                <div>
                    <h1 className='text-3xl font-bold text-center my-10'>Contact Us</h1>
                    <div className='flex-center flex-col gap-5'>
                        <input type="text" placeholder='Your Name' className='p-3 border rounded-lg w-full max-w-md' />
                        <input type="email" placeholder='Your Email' className='p-3 border rounded-lg w-full max-w-md' />
                        <textarea placeholder='Your Message' className='p-3 border rounded-lg w-full max-w-md h-40'></textarea>
                        <button className='px-6 py-3 bg-violet-700 text-white rounded-[5px] rounded-tr-3xl'>Send Message</button>
                    </div>
                </div>
                <div className='bg-violet-800 rounded-t-2xl rounded-br-[50px] border-4 border-violet-900 flex items-end justify-end max-lg:hidden'>
                    <Image
                        src='/robots/service-3.png'
                        alt='Contact Image'
                        width={500}
                        height={500}
                        className='rounded-2xl'
                    />
                    <div className='bg-violet-900 text-white p-3 rounded-full text-sm font-bold absolute m-7'>#WE_GOT_YOU</div>
                </div>
            </div>
        </section>
    )
}

export default Contact