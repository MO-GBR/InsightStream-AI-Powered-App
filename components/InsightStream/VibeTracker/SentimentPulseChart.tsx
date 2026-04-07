"use client"

import React from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts"

const data = [
    { time: "10s", score: 60 },
    { time: "8s", score: 63 },
    { time: "6s", score: 65 },
    { time: "4s", score: 68 },
    { time: "2s", score: 66 },
    { time: "Now", score: 70 },
];

const SentimentPulseChart = () => {
    return (
        <div className='card h-[320px]'>
            <h3 className="font-semibold mb-4">
                Sentiment Pulse
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis domain={[0,100]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={false}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SentimentPulseChart