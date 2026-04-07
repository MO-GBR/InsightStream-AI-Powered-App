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

const Navbar = async () => {
    return (
        <nav className='w-full border-b border-gray-600 p-3 bg-gray-800 flex items-center justify-between'>
            <div className="border rounded-xl pl-3 py-2 text-sm text-muted-foreground">
                Search...    ⌘K <span className="ml-7 p-1 bg-gray-700 rounded-[10px] m-1">Ctrl K</span>
            </div>
            <ActionButton />
        </nav>
    )
}

export default Navbar