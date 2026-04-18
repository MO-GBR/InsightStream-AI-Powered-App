import { auth } from '@/lib/auth'
import { sentimentScanner } from '@/lib/InsightStream/sentiment/sentimentScanner'
import { ProjectAPI } from '@/lib/InsightStream/services/project/ProjectAPI'
import { prisma } from '@/lib/prisma'
import React from 'react'

const SummaryCard = async () => {
    const session = await auth();

    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        }
    });

    const projects = await prisma.project.findMany({
        where: {
            userId: session?.user?.id
        }
    });

    const mentions = await prisma.mention.findMany({
        where: {
            project: {
                userId: session?.user?.id
            }
        }
    });

    const crisis = await prisma.crisis.findMany({
        where: {
            project: {
                userId: session?.user?.id
            }
        }
    });

    let avgSentiment = 0;

    for (const project of projects) {
        const projectSentiment = await sentimentScanner(project.id);
        console.log('Tester:', projectSentiment.label)
        avgSentiment += projectSentiment.sentiment;
    }

    return (
        <div className="summary-card">
            <h3 className="text-white font-medium mb-4">
                System Overview
            </h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-white/60">
                        Active Pulses
                    </span>
                    <span className="text-white">
                        {projects.length}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/60">
                        Mentions Tracked
                    </span>
                    <span className="text-white">
                        {mentions.length}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/60">
                        Avg Sentiment
                    </span>
                    <span className="text-emerald-400">
                        {
                            projects.length > 0 ? (avgSentiment / projects.length).toFixed(2) : 'N/A'
                        }
                    </span>
                </div>
  
                <div className="flex justify-between">
                    <span className="text-white/60">
                        Active Alerts
                    </span>
                    <span className="text-rose-400">
                        {crisis.length}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard