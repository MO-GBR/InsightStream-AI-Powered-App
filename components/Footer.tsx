import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full bg-gray-900 py-8 border-t border-gray-700 mt-10 flex-center max-lg:flex-col max-lg:gap-3'>
            <div className='w-full flex-center gap-10 flex-col'>
                <p className='text-sm text-gray-400'>© 2024 LVL. All rights reserved.</p>
                <div className='flex items-center gap-5'>
                    <a href='#' className='text-gray-400 hover:text-gray-300 transition-colors duration-300'>Privacy Policy</a>
                    <a href='#' className='text-gray-400 hover:text-gray-300 transition-colors duration-300'>Terms of Service</a>
                    <a href='#' className='text-gray-400 hover:text-gray-300 transition-colors duration-300'>Contact Us</a>
                </div>
            </div>
            <div className='w-full border-gray-950 p-3 mr-3 rounded-t-2xl bg-gradient-to-b from-gray-800 to-gray-900'>
                <p>Subscribe to our Newsletter</p>
                <form className='flex items-center gap-2 mt-4'>
                    <input type="email" placeholder='Enter your email' className='p-3 rounded-lg w-full max-w-md' />
                    <button className='px-6 py-3 bg-violet-700 text-white rounded-[5px] rounded-tr-3xl'>Subscribe</button>
                </form>
            </div>
        </footer>
    )
}

export default Footer