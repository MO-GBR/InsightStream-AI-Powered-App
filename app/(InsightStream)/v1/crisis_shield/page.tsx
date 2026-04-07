import AlertsFeed from '@/components/InsightStream/CrisisSheild/AlertsFeed'
import CrisisShieldHeader from '@/components/InsightStream/CrisisSheild/CrisisShieldHeader'
import CrisisStatusCard from '@/components/InsightStream/CrisisSheild/CrisisStatusCard'
import NegativeSentimentChart from '@/components/InsightStream/CrisisSheild/NegativeSentimentChart'
import React from 'react'

const page = () => {
    return (
        <div>
            <CrisisShieldHeader />
            <div className='flex items-center gap-2 w-full'>
                <CrisisStatusCard risk='HIGH' spike={15} />
                <NegativeSentimentChart />
            </div>
            <AlertsFeed />
        </div>
    )
}

export default page