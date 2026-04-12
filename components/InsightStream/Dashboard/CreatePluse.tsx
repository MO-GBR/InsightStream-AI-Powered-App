'use client'
import { ProjectAPI } from '@/lib/InsightStream/services/project/ProjectAPI';
import { prisma } from '@/lib/prisma';
import { useModalStore } from '@/lib/zustand/ModalStore';
import { useProjectStore } from '@/lib/zustand/ProjectStore'
import { useState, SubmitEvent } from 'react';

const CreatePluse = () => {
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
        <form
            className='card flex-center flex-col'
            onSubmit={handleSubmit}
        >
            <h2 className='text-2xl font-bold mb-4'>Create New Pluse</h2>
            <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    className="pluse-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter project name"
                />
            </div>
            <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">Keyword</label>
                <input
                    type="text"
                    id="keyword"
                    name="keyword"
                    className="pluse-input"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword to track"
                />
            </div>
            <div>
                <label htmlFor="brandVoice" className="block text-sm font-medium text-gray-700">Brand Voice</label>
                <textarea
                    id="brandVoice"
                    name="brandVoice"
                    className="pluse-input h-24 resize-none"
                    value={brandVoice}
                    onChange={(e) => setBrandVoice(e.target.value)}
                    placeholder="Describe your brand voice and tone"
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >{
                loading ? 'Creating...' : 'Create Pluse'
            }</button>
        </form>
    )
}

export default CreatePluse