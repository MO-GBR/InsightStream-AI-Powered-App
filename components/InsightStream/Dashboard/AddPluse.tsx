'use client';

import { useModalStore } from '@/lib/zustand/ModalStore';
import Image from 'next/image'
import React from 'react'
import CreatePluse from './CreatePluse';

const AddPluse = () => {
    const { openModal } = useModalStore();
    const handleOpenModal = () => {
        try {
            openModal(<CreatePluse />);
            console.log('Modal opened successfully');
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    };
    return (
        <div
            className='bg-white/10 border border-dashed rounded-xl flex-center cursor-pointer'
            onClick={handleOpenModal}
        >
            <div className='flex-center gap-2'>
                <Image src='/icons/file-02.svg' width={30} height={30} alt='add-pluse' />
                <p className='font-bold text-white'>
                    Add <span className='border p-2 mx-1 rounded-full'>+1</span> Pluse
                </p>
            </div>
        </div>
    )
}

export default AddPluse