import React from 'react'

const SummaryCard = () => {
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
                        3
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/60">
                        Mentions Tracked
                    </span>
                    <span className="text-white">
                        42,380
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/60">
                        Avg Sentiment
                    </span>
                    <span className="text-emerald-400">
                        +0.32
                    </span>
                </div>
  
                <div className="flex justify-between">
                    <span className="text-white/60">
                        Active Alerts
                    </span>
                    <span className="text-rose-400">
                        1
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard