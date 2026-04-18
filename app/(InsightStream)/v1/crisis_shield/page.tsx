import AlertsFeed from '@/components/InsightStream/CrisisSheild/AlertsFeed'
import CrisisShieldHeader from '@/components/InsightStream/CrisisSheild/CrisisShieldHeader'
import CrisisStatusCard from '@/components/InsightStream/CrisisSheild/CrisisStatusCard'
import NegativeSentimentChart from '@/components/InsightStream/CrisisSheild/NegativeSentimentChart'
import { auth } from '@/lib/auth';
import { scanRisk } from '@/lib/InsightStream/crisis/riskCrisis';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import React from 'react'

const page = async () => {
    const session = await auth();
    
    const cookieStore = await cookies();
    const selectedProjectId = cookieStore.get('currentProjectId')?.value;
    
    const projects = await prisma.project.findMany({
        where: { userId: session?.user?.id },
        orderBy: { createdAt: 'asc' },
        select: { id: true },
    });
    
    const project = projects.find((item) => item.id === selectedProjectId) ?? projects[0];
    
    const Alert = await scanRisk(project.id);
    return (
        <div>
            <CrisisShieldHeader />
            <div className='flex items-center gap-2 w-full'>
                <CrisisStatusCard risk={Alert.risk} mentionsSpike={Alert.mentionsSpike} message={Alert.message} />
                <NegativeSentimentChart />
            </div>
            <AlertsFeed />
        </div>
    )
}

export default page