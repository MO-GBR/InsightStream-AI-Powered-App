import React from 'react'
import PulseCard from './PulseCard';
import { ProjectAPI } from '@/lib/InsightStream/services/project/ProjectAPI';

const AllPluses = async () => {
    const projects = await ProjectAPI.getProjects();
    
    return (
        <>
            {
                projects.length > 0 ? (
                    <>
                        {
                            projects.map((project, index) => (
                                <PulseCard
                                    key={index}
                                    project={project}
                                />
                            ))
                        }
                    </>
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