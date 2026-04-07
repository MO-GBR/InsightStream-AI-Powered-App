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
} from "recharts";

const data = [
    { time: "10m", negative: 32 },
    { time: "8m", negative: 41 },
    { time: "6m", negative: 48 },
    { time: "4m", negative: 55 },
    { time: "2m", negative: 63 },
    { time: "Now", negative: 71 },
];
  
  

const NegativeSentimentChart = () => {
    return (
        <div className="card w-[400px] h-[320px]">
            <h3 className="font-semibold mb-4">
                Negative Sentiment Spike
            </h3>
            <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="negative"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default NegativeSentimentChart