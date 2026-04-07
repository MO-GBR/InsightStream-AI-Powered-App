'use client';

import React from 'react'

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
    Legend,
} from "recharts"

const data = [
    { metric: "Customer Satisfaction", brand: 80, compA: 65, compB: 55 },
    { metric: "Social Buzz", brand: 72, compA: 78, compB: 60 },
    { metric: "Support Quality", brand: 75, compA: 62, compB: 58 },
    { metric: "Product Reputation", brand: 83, compA: 70, compB: 64 },
    { metric: "Brand Trust", brand: 78, compA: 66, compB: 59 },
]

const MarketSentimentRadar = () => {
    return (
        <div className="card h-[350px]">
            <h3 className="font-semibold mb-4">
                Market Sentiment Radar
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <Radar
                        name="Your Brand"
                        dataKey="brand"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="Competitor A"
                        dataKey="compA"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                    />
                    <Radar
                        name="Competitor B"
                        dataKey="compB"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.3}
                    />
                    <Legend />
  
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MarketSentimentRadar