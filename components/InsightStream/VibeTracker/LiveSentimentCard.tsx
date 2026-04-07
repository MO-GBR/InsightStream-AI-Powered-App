import React from 'react'

const status = [
    {
        status: '😊 Positive',
        num: 68
    },
    {
        status: '😐 Neutral',
        num: 21
    },
    {
        status: '😡 Negative',
        num: 11
    },
];

const LiveSentimentCard = () => {
    return (
        <div className='card'>
            <h3 className="font-semibold mb-4">
                Live Sentiment
            </h3>

            <div className="space-y-2 text-sm">
                {
                    status.map((s, i) => (
                        <div key={i} className='flex justify-between'>
                            <span>{s.status}</span>
                            <span>{s.num}%</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LiveSentimentCard