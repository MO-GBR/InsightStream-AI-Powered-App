import BrandScoreboard from '@/components/InsightStream/WarRoom/BrandScoreboard'
import MarketActivityFeed from '@/components/InsightStream/WarRoom/MarketActivityFeed'
import MarketSentimentRadar from '@/components/InsightStream/WarRoom/MarketSentimentRadar'
import MentionVolumeChart from '@/components/InsightStream/WarRoom/MentionVolumeChart'
import SentimentBattleChart from '@/components/InsightStream/WarRoom/SentimentBattleChart'
import React from 'react'

const WarRoomPage = () => {
    return (
        <div className="grid grid-cols-12 gap-6 p-5">
            <div className="col-span-12">
                <BrandScoreboard />
            </div>
            <div className="col-span-5">
                <SentimentBattleChart />
            </div>
            <div className="col-span-7">
                <MarketSentimentRadar />
            </div>
            <div className="col-span-6">
                <MentionVolumeChart />
            </div>
            <div className="col-span-6">
                <MarketActivityFeed />
            </div>
        </div>
    )
}

export default WarRoomPage