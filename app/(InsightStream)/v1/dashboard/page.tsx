
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'
import AddPluse from '@/components/InsightStream/Dashboard/AddPluse';
import CrisisCard from '@/components/InsightStream/Dashboard/CrisisCard';
import SummaryCard from '@/components/InsightStream/Dashboard/SummaryCard';
import HeatmapCard from '@/components/InsightStream/Dashboard/HeatmapCard';
import VibeCard from '@/components/InsightStream/Dashboard/VibeCard';
import BriefingAudioPlayer from '@/components/InsightStream/Dashboard/BriefingAudioPlayer';
import AllPluses from '@/components/InsightStream/Dashboard/AllPluses';

const Dashboard = async () => {
    const session = await auth();
    if(!session?.user) redirect('/');

    console.log('User session:', session);

    return (
        <div className='w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full p-5'>
                <SummaryCard />
                <BriefingAudioPlayer audioUrl='/censor-beep-1-372459.mp3' />
                <HeatmapCard />
                <VibeCard />
                <AddPluse />
                <CrisisCard />
                <AllPluses />
            </div>
        </div>
    )
}

export default Dashboard