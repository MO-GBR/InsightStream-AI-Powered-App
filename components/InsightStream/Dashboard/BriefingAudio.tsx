import { apiFetcherWithRetries } from '@/lib/utils/API_Fetcher'
import React from 'react'
import BriefingAudioPlayer from './BriefingAudioPlayer';
import { cookies } from 'next/headers';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const BriefingAudio = async () => {
    const cookieStore = await cookies();
    const selectedProjectId = cookieStore.get('currentProjectId')?.value;
    const session = await auth();

    console.log('Details ====>', session?.user);

    const userProjects = await prisma.project.findMany({
        where: {
            userId: session?.user?.id
        }
    });

    console.log('projects ===>', userProjects);

    let fetchBriefing: { briefing?: { audioUrl?: string } } | null = null;

    if (selectedProjectId) {
        try {
            if(userProjects.length === 0) {
                fetchBriefing = null;
            } else {
                fetchBriefing = await apiFetcherWithRetries(`/api/briefing/latest/${selectedProjectId}`);
            }
        } catch {
            fetchBriefing = null;
        }
    }

    return (
        <div className='col-span-2 flex flex-col'>
            <h3 className="font-semibold mb-4">
                Latest Briefing Audio
            </h3>

            {
                fetchBriefing?.briefing?.audioUrl ? (
                    <BriefingAudioPlayer audioUrl={fetchBriefing?.briefing?.audioUrl} />
                ) : (
                    <p className='text-sm text-gray-500'>No briefing audio available.</p>
                )
            }
        </div>
    )
}

export default BriefingAudio