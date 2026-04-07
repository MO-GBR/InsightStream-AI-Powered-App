'use client';

import React from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts"
  
const data = [
    { time: "10m", brand: 60, compA: 52, compB: 40 },
    { time: "8m", brand: 63, compA: 54, compB: 41 },
    { time: "6m", brand: 67, compA: 57, compB: 42 },
    { time: "4m", brand: 69, compA: 59, compB: 44 },
    { time: "2m", brand: 71, compA: 60, compB: 45 },
    { time: "Now", brand: 72, compA: 61, compB: 45 },
]

const SentimentBattleChart = () => {
    return (
        <div className="card h-[350px]">
            <h3 className="font-semibold mb-4">
                Sentiment Battle
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="brand"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="compA"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="compB"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SentimentBattleChart