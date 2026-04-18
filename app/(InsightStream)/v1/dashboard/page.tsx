
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { cookies } from 'next/headers';
import AddPluse from '@/components/InsightStream/Dashboard/AddPluse';
import CrisisCard from '@/components/InsightStream/Dashboard/CrisisCard';
import SummaryCard from '@/components/InsightStream/Dashboard/SummaryCard';
import HeatmapCard from '@/components/InsightStream/Dashboard/HeatmapCard';
import VibeCard from '@/components/InsightStream/Dashboard/VibeCard';
import BriefingAudioPlayer from '@/components/InsightStream/Dashboard/BriefingAudioPlayer';
import AllPluses from '@/components/InsightStream/Dashboard/AllPluses';
import { prisma } from '@/lib/prisma';
import { scanRisk } from '@/lib/InsightStream/crisis/riskCrisis';

const Dashboard = async () => {
    const session = await auth();
    if(!session?.user) redirect('/');

    const cookieStore = await cookies();
    const selectedProjectId = cookieStore.get('currentProjectId')?.value;

    const projects = await prisma.project.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'asc' },
        select: { id: true },
    });

    const project = projects.find((item) => item.id === selectedProjectId) ?? projects[0];

    const Alert = await scanRisk(project.id);

    console.log('id', selectedProjectId, 'project', project, 'Alert', Alert);

    return (
        <div className='w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full p-5'>
                <SummaryCard />
                <BriefingAudioPlayer audioUrl='/censor-beep-1-372459.mp3' />
                <HeatmapCard />
                <VibeCard />
                <AddPluse />
                {
                    Alert.risk !== "LOW" && <CrisisCard mentionsSpike={Alert.mentionsSpike} topKeyword={Alert.topKeyword} /> 
                }
                <AllPluses />
            </div>
        </div>
    )
}

export default Dashboard