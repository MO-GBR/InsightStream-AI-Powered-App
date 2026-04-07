'use client';

import React, { useActionState } from 'react'
import { useSession } from "next-auth/react"

import { loginAction } from '@/lib/actions/user.action';
import GoogleOAuth from '@/components/GoogleOAuth';
import { redirect } from 'next/navigation';

const SignInPage = () => {
    const [ state, action, loading ] = useActionState(loginAction, {
        errors: {}
    });
    const { data: session } = useSession();
    if(session?.user) redirect("/v1/dashboard");
    return (
        <div id='signin' className='w-full min-h-screen flex-center'>
            <div className='glass p-5'>
                <h1 className='text-3xl font-bold text-white mb-4'>Sign In</h1>
                <form className='flex flex-col gap-4 w-[300px]' action={action}>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500'
                    />
                    {
                        state?.errors?.email && (
                            <p className='text-red-500 text-sm'>{state.errors.email[0]}</p>
                        )
                    }
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500'
                    />
                    {
                        state?.errors?.password && (
                            <p className='text-red-500 text-sm'>{state.errors.password[0]}</p>
                        )
                    }
                    <button type='submit' className='btn btn-primary'>
                        {
                            loading ? 'Signing In...' : 'Sign In'
                        }
                    </button>
                </form>
                <div className='flex-center gap-4 my-5'>
                    <div className='line w-[100px]' />
                    <p className='font-bold font-mono text-xl'>OR</p>
                    <div className='line w-[100px]' />
                </div>
                <GoogleOAuth />
            </div>
        </div>
    )
}

export default SignInPage