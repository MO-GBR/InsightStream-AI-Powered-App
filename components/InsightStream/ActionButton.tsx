import { auth, signOut } from '@/lib/auth'
import Image from 'next/image'
import React from 'react'

const ActionButton = async () => {
    const session = await auth();
    return (
        <div className='flex items-center justify-between px-2 gap-3'>
            <div>
                Welcome Back, {session?.user?.name}
            </div>
            <div className='border rounded-full'>
                {
                    session?.user?.image
                        && <Image src={session.user.image} alt='user' height={40} width={40} className='rounded-full' />
                }
            </div>
            <form action={
                async () => {
                    'use server'
                    await signOut();
                }
            } className='flex-center' title='Log out'>
                <button className='flex-center'>
                    <Image src='/icons/logout.svg' alt='logout' width={30} height={30} />
                </button>
            </form>
        </div>
    )
};


export default ActionButton