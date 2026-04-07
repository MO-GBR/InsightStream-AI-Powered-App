import React from 'react'

const activities = [
    "🚀 Competitor A launched a new product",
    "🔥 Your brand trending on Twitter",
    "⚠ Competitor B facing negative reviews",
    "📈 Your brand sentiment rising",
];

const MarketActivityFeed = () => {
    return (
        <div className="rounded-xl border p-6">
            <h3 className="font-semibold mb-4">
                Market Activity
            </h3>
            <ul className="space-y-3 text-sm">
                {
                    activities.map((activity, i) => (
                        <li key={i}>
                            {activity}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MarketActivityFeed