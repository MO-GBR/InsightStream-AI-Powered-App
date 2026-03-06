'use client';

import { PricingPlans } from '@/constants'
import Image from 'next/image'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpPage = () => {
    const [selectedPlan, setSelectedPlan] = useState({
        name: 'Basic',
        select: 0
    });

    const setPlan = (index: number) => {
        setSelectedPlan({
            name: PricingPlans[index].name,
            select: index
        });
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = await fetch('/api/signup', {
            method: "POST",
            body: JSON.stringify({
                email: formData.get('email'),
                username: formData.get('username'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
                plan: selectedPlan.name
            })
        });
        const response = await data.json();

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
                <form className='flex flex-col gap-4 w-[300px]'>
                    <input type='email' placeholder='Email' className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500' />
                    <input type='text' placeholder='Username' className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500' />
                    <input type='password' placeholder='Password' className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500' />
                    <input type='password' placeholder='Confirm Password' className='p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500' />
                    <div>
                        <input type='file' className='hidden' />
                        <span className='text-gray-400 text-sm ml-2'>Upload Profile Picture (Optional)</span>
                    </div>
                    <button type='submit' className='btn btn-primary'>Sign Up</button>
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
                    <Image src='/services/service-1.png' alt='sign up' width={500} height={500} />
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