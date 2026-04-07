'use client';

import { PricingPlans } from '@/constants'
import Image from 'next/image'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterInput } from '@/lib/utils/Zod';

const SignUpPage = () => {
    const [selectedPlan, setSelectedPlan] = useState({
        name: 'Basic',
        select: 0
    });

    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const setPlan = (index: number) => {
        setSelectedPlan({
            name: PricingPlans[index].name,
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
                plan: selectedPlan.name,
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
    };

    return (
        <div className='w-full flex'>
            <div className='p-16 mt-11'>
                <div className='flex-center gap-2 mb-5'>
                    <Image src='/logo.svg' alt='logo' width={50} height={50} className='mb-5' />
                    <p className='font-bold font-mono text-2xl'>InsightStream</p>
                </div>
                <h1 className='text-3xl font-bold text-white mb-4'>Sign Up</h1>
                <p className='text-xl font-bold text-white'>Step 1</p>
                <div className='flex flex-col'>
                    <p className='text-gray-400'>Choose Plan</p>
                    <div className='flex items-center my-5 gap-2'>
                        {
                            PricingPlans.map((plan, index) => (
                                <div key={index} className={`rounded-xl p-3 w-[7rem] ${selectedPlan.select === index ? 'bg-violet-900 border border-violet-700' : 'bg-gray-800'} cursor-pointer`} onClick={() => setPlan(index)}>
                                    <h2 className='text-xl font-bold text-white'>{plan.name}</h2>
                                    <p className='text-gray-400'>${plan.price}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <p className='text-xl font-bold text-white'>Step 2</p>
                <p className='text-gray-400 mb-8'>Create an account to get started.</p>
                <form className='flex flex-col gap-4 w-[300px]' onSubmit={handleSubmit(onSubmit)}>
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
                <div className='flex-center'>
                    <button className='border rounded-xl bg-gray-900 border-violet-950 text-violet-900 font-bold py-2 px-7'>Sign Up with Google</button>
                </div>
            </div>
            <div className='w-full'>
                <div className='bg-gray-900/80 backdrop-blur-sm border-l border-gray-700 h-full w-full flex items-center flex-col'>
                    <Image src='/robots/service-1.png' alt='sign up' width={500} height={500} />
                    <div className='border rounded-[10px] p-6 shadow-2xl text-center'>
                        <h1 className='text-4xl font-bold text-white mb-4'>Welcome to Our Service</h1>
                        <p className='text-gray-400 text-lg'>Join us today and enjoy exclusive benefits!</p>
                        <div className='flex'>
                            <a className='btn btn-primary mt-6' href='/'>Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage