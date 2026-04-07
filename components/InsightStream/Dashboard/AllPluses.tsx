'use client';
import { useProjectStore } from '@/lib/zustand/ProjectStore';
import React from 'react'

const AllPluses = () => {
    const { projects } = useProjectStore();
    return (
        <>
            {
                projects.length > 0 ? (
                    <div>All</div>
                ) : (
                    <div className='col-span-3 flex-center flex-col p-6'>
                        <h2 className="text-2xl font-bold mb-4">No Projects Found</h2>
                        <p className="text-gray-600">Please create a project to see the insights stream.</p>
                        <p className='text-white my-5'>
                            <span className='text-blue-500'>Hint:</span> Click on the "Add Pluse" card or <span className='bg-gray-800 font-bold border-2 rounded-[10px] p-2'>CTRL + K</span> to create your first project and start receiving insights!
                        </p>
                    </div>
                )
            }
        </>
    )
}

export default AllPluses