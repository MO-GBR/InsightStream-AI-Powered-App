import React from 'react'

const SignInPage = () => {
    return (
        <div id='signin' className='w-full min-h-screen flex-center'>
            <div className='glass p-5'>
                <h1 className='text-3xl font-bold text-white mb-4'>Sign In</h1>
                <form className='flex flex-col gap-4 w-[300px]'>
                    <input type='email' placeholder='Email' className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500' />
                    <input type='password' placeholder='Password' className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500' />
                    <button type='submit' className='btn btn-primary'>Sign In</button>
                </form>
                <div className='flex-center gap-4 my-5'>
                    <div className='line w-[100px]' />
                    <p className='font-bold font-mono text-xl'>OR</p>
                    <div className='line w-[100px]' />
                </div>
                <div className='flex-center'>
                    <button className='border rounded-xl bg-gray-900 border-violet-950 text-violet-900 font-bold py-2 px-7'>Sign In with Google</button>
                </div>
            </div>
        </div>
    )
}

export default SignInPage