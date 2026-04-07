import React from 'react'

const HeatmapCard = () => {
    const getSentimentColor = (score: number) => {
        if (score > 0.6) return "bg-emerald-500"
        if (score > 0.2) return "bg-green-400"
        if (score > -0.2) return "bg-slate-500"
        if (score > -0.6) return "bg-orange-400"
        return "bg-rose-500"
    };

    const sentimentData = [
        0.7, 0.6, 0.2, -0.1, -0.5, -0.7, 0.3,
        0.6, 0.3, 0.1, -0.4, -0.6, 0.1, 0.4,
        0.7, 0.5, 0.4, 0.2, -0.3, 0.1, 0.5
    ];
    return (
        <div className="heatmap-card">
            <h3 className="text-white mb-4">
                🔥 Sentiment Heatmap
            </h3>
            <div className="grid grid-cols-7 gap-2">
                {
                    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                        <div key={idx}>{day}</div>
                    ))
                }
                {sentimentData.map((score, i) => (
                    <div
                        key={i}
                        className={`heatmap-cell ${getSentimentColor(score)}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeatmapCard