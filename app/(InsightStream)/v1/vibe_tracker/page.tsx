import EmotionDistribution from '@/components/InsightStream/VibeTracker/EmotionDistribution'
import LiveSentimentCard from '@/components/InsightStream/VibeTracker/LiveSentimentCard'
import MentionRateCard from '@/components/InsightStream/VibeTracker/MentionRateCard'
import SentimentPulseChart from '@/components/InsightStream/VibeTracker/SentimentPulseChart'
import SentimentStream from '@/components/InsightStream/VibeTracker/SentimentStream'
import React from 'react'
import { cookies } from 'next/headers';
import { sentimentScanner } from '@/lib/InsightStream/sentiment/sentimentScanner'

const VibeTrackerPage = async () => {
    const cookieStore = await cookies();
    const selectedProjectId = cookieStore.get('currentProjectId')?.value;
    const projectData = await sentimentScanner(selectedProjectId!);
    
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
                <LiveSentimentCard data={projectData.distribution} />
            </div>
            <div className="col-span-6">
                <MentionRateCard />
            </div>
            <div className="col-span-12">
                <SentimentPulseChart />
            </div>
            <div className="col-span-7">
                <SentimentStream />
            </div>
            <div className="col-span-5">
                <EmotionDistribution />
            </div>
        </div>
    )
}

export default VibeTrackerPage