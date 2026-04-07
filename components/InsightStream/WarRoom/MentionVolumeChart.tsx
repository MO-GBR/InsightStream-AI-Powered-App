'use client';

import React from 'react'

import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const data = [
    { name: "Your Brand", mentions: 1200 },
    { name: "Competitor A", mentions: 850 },
    { name: "Competitor B", mentions: 540 },
]

const MentionVolumeChart = () => {
    return (
        <div className="card h-[300px]">
            <h3 className="font-semibold mb-4">
                Mention Volume
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar
                        dataKey="mentions"
                        fill="#6366f1"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MentionVolumeChart