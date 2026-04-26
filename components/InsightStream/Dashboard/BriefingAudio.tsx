import { apiFetcherWithRetries } from '@/lib/utils/API_Fetcher'
import React from 'react'
import BriefingAudioPlayer from './BriefingAudioPlayer';
import { cookies } from 'next/headers';

const BriefingAudio = async () => {
    const cookieStore = await cookies();
    const selectedProjectId = cookieStore.get('currentProjectId')?.value;

    const fetchAudioUrl = await apiFetcherWithRetries(`/api/briefing/latest/${selectedProjectId}`);

    return (
        <div className='col-span-2'>
            <h3 className="font-semibold mb-4">
                Latest Briefing Audio
            </h3>

            {
                // fetchAudioUrl?.briefing?.audioUrl ? (
                //     <BriefingAudioPlayer audioUrl={fetchAudioUrl.briefing.audioUrl} />
                // ) : (
                //     <p className='text-sm text-gray-500'>No briefing audio available.</p>
                // )
            }
        </div>
    )
}

export default BriefingAudio