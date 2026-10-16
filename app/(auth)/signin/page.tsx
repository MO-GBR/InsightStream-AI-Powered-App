'use client';

import React, { useActionState } from 'react'
import { useSession } from "next-auth/react"

import { loginAction } from '@/lib/actions/user.action';
import GoogleOAuth from '@/components/Auth/GoogleOAuth';
import { redirect } from 'next/navigation';
import Logo from '@/components/Logo';
import Link from 'next/link';

const SignInPage = () => {
    const [ state, action, loading ] = useActionState(loginAction, {
        errors: {}
    });

    const { data: session } = useSession();
    if(session?.user) redirect("/v1/dashboard");
    
    return (
        <div id='signin' className='w-full min-h-screen flex-center'>
            <div className='bg-gray-800 p-5 border-2 border-gray-900 max-lg:rounded-xl rounded-tl-xl rounded-bl-xl md:border-r-0'>
                <form className='flex flex-col gap-4 w-[300px] max-lg:w-full' action={action}>
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className="mb-3 block font-mono text-[10px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                                01 / Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email"
                                className="w-full mb-4 border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                            />
                            {
                                state?.errors?.email && (
                                    <p className='text-red-500 text-sm'>{state.errors.email[0]}</p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className="mb-3 block font-mono text-[10px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                                02 / Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Your password"
                                className="w-full mb-4 border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                            />
                            {
                                state?.errors?.password && (
                                    <p className='text-red-500 text-sm'>{state.errors.password[0]}</p>
                                )
                            }
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            {
                                loading ? 'Signing In...' : 'Sign In'
                            }
                        </button>
                    </div>
                </form>
                <div className='flex-center gap-4 my-5'>
                    <div className='line w-[100px]' />
                    <p className='font-bold font-mono text-xl'>OR</p>
                    <div className='line w-[100px]' />
                </div>
                <GoogleOAuth />
            </div>
            <div className='bg-black h-[30rem] rounded-2xl border-2 border-r-4 border-gray-800 hidden md:flex-center w-fit p-5'>
                <div
                    className="group flex-center flex-col gap-8"
                >
                    <Logo square="h-20 w-20" dot="h-6 w-6" />

                    <span className="text-sm font-bold tracking-[0.2em] text-white">
                        INSIGHT<span className="text-[#0fff37]">STREAM</span>
                    </span>
                    <span className="text-center text-[10px] text-white bg-[#00530e] font-bold p-2 rounded-full">
                        #WE_GOT_YOU
                    </span>
                    <Link href='/signup' className='text-sm text-green-600 underline'>Create Account</Link>
                </div>
            </div>
        </div>
    )
}

export default SignInPage