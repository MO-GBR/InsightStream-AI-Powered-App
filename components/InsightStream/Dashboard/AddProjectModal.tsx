'use client'
import Logo from '@/components/Logo';
import { ProjectAPI } from '@/lib/InsightStream/services/project/ProjectAPI';
import { prisma } from '@/lib/prisma';
import { useModalStore } from '@/lib/zustand/ModalStore';
import { useProjectStore } from '@/lib/zustand/ProjectStore'
import { useState, SubmitEvent } from 'react';

const AddProjectModal = () => {
    const [ name, setName ] = useState('');
    const [ keyword, setKeyword ] = useState('');
    const [ brandVoice, setBrandVoice ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const { setCurrentProject } = useProjectStore();
    const { closeModal } = useModalStore();

    const handleSubmit = async (e: SubmitEvent) => {
        setLoading(true);
        try {
            e.preventDefault();
            const project = await ProjectAPI.createProject({
                name,
                keyword,
                brandVoice,
            });

            const cursorResponse = await fetch('/api/projects/init_cursors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: project.id,
                    keyword,
                }),
            });

            if (!cursorResponse.ok) {
                throw new Error('Failed to initialize project cursors');
            };

            useProjectStore.setState((state) => ({
                projects: [project, ...state.projects],
            }));

            setCurrentProject(project);
        } catch (error) {
            console.error('Error creating project:', error);
        } finally {
            setLoading(false);
            closeModal();
        }
    }
    return (
        <div className='flex-center'>
            <div className='bg-gray-800 p-5 border-2 border-gray-900 rounded-xl'>
                <form className='flex flex-col gap-4 w-[300px] max-lg:w-full' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="Name" className="mb-3 block font-mono text-[10px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                            01 / Project Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your project name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full mb-4 border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="keyword" className="mb-3 block font-mono text-[10px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                            02 / Project keyword
                        </label>
                        <input
                            type="text"
                            name="keyword"
                            placeholder="Keyword to track across social-media"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                            className="w-full mb-4 border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="brand voice" className="mb-3 block font-mono text-[10px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                            03 / Project brand voice
                        </label>
                        <textarea
                            name="brand voice"
                            placeholder="brand voice & tone, Describe how your brand reacts"
                            value={brandVoice}
                            onChange={e => setBrandVoice(e.target.value)}
                            className="w-full mb-4 border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                        />
                    </div>
                    <button type='submit' className='bg-green-800 text-white font-bold border border-green-500 rounded-xl'>
                        {
                            loading ? 'Creating project ...' : 'Submit'
                        }
                    </button>
                </form>
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
                </div>
            </div>
        </div>
    )
}

export default AddProjectModal