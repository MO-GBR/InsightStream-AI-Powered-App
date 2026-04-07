'use client';

import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Positive", value: 68 },
    { name: "Neutral", value: 21 },
    { name: "Negative", value: 11 },
];

const EmotionDistribution = () => {
    return (
        <div className='card h-[320px]'>
            <h3 className="font-semibold mb-4">
                Emotion Distribution
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EmotionDistribution