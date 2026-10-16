'use client';

import { PricingPlans } from '@/constants'
import Image from 'next/image'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterInput } from '@/lib/utils/Zod';
import { redirect } from "next/navigation";
import Logo from '@/components/Logo';
import Link from 'next/link';

const SignUpPage = () => {
    const [selectedPlan, setSelectedPlan] = useState({
        title: 'Basic',
        select: 0
    });

    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const setPlan = (index: number) => {
        setSelectedPlan({
            title: PricingPlans[index].title,
            select: index
        });
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (values: RegisterInput) => {
        setServerMessage(null);

        const response = await fetch('/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...values,
                plan: selectedPlan.title,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setServerMessage(data.error ?? 'Failed to create account.');
            return;
        }

        setServerMessage('Account created successfully!');
        reset();

        console.log('New User:', response);

        redirect('/signin');
    };

    return (
        <div className='w-full flex'>
            <div className='p-16 max-lg:p-3 mt-11'>
                <button
                    className="group flex items-center gap-3"
                >
                    <Logo square="h-8 w-8" dot="h-2 w-2" />

                    <span className="text-sm font-bold tracking-[0.2em] text-white">
                        INSIGHT<span className="text-[#0fff37]">STREAM</span>
                    </span>
                </button>
                <h1 className='text-3xl font-bold text-white my-4'>Sign Up</h1>
                <p className='text-xl font-bold text-white'>Step 1</p>
                <div className='flex flex-col'>
                    <p className='text-gray-400'>Choose Plan</p>
                    <div className='flex items-center my-5 gap-2'>
                        {
                            PricingPlans.map((plan, index) => (
                                <div key={index} className={`rounded-xl p-3 w-[7rem] ${selectedPlan.select === index ? 'bg-green-900 border border-green-700' : 'bg-gray-800'} cursor-pointer`} onClick={() => setPlan(index)}>
                                    <h2 className='text-xl font-bold text-white'>{plan.title}</h2>
                                    <p className='text-gray-400'>{plan.price}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <p className='text-xl font-bold text-white'>Step 2</p>
                <p className='text-gray-400 mb-8'>Create an account to get started.</p>
                <form className='flex flex-col gap-4 w-[300px] max-lg:w-full' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='email'
                        placeholder='Email'
                        className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500'
                        {...register('email')}
                    />
                    {errors.email && <p className='text-red-400 text-sm mt-1'>{errors.email.message}</p>}
                    <input
                        type='text'
                        placeholder='Username'
                        className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500'
                        {...register('name')}
                    />
                    {errors.name && <p className='text-red-400 text-sm mt-1'>{errors.name.message}</p>}
                    <input
                        type='password'
                        placeholder='Password'
                        className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500'
                        {...register('password')}
                    />
                    {errors.password && <p className='text-red-400 text-sm mt-1'>{errors.password.message}</p>}
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500'
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <p className='text-red-400 text-sm mt-1'>{errors.confirmPassword.message}</p>
                    )}
                    {serverMessage && <p className='text-sm text-violet-300'>{serverMessage}</p>}
                    <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div className='flex-center gap-4 my-5'>
                    <div className='line w-[100px]' />
                    <p className='font-bold font-mono text-xl'>OR</p>
                    <div className='line w-[100px]' />
                </div>
                <div className='flex-center flex-col gap-2'>
                    <button className='border rounded-xl bg-gray-700 border-[#00530e] text-[#0fff37] font-bold py-2 px-7'>Sign Up with Google</button>
                    <Link href='/signin' className='text-sm text-green-600 underline'>Already have an account, Sign in</Link>
                </div>
            </div>
            <div className='w-full max-lg:hidden'>
                <div className='bg-gray-900/80 backdrop-blur-sm border-l border-gray-700 h-full w-full flex items-center flex-col justify-center'>
                    <Image src='/Cubes.png' alt='sign up' width={500} height={500} />
                </div>
            </div>
        </div>
    )
}

export default SignUpPage