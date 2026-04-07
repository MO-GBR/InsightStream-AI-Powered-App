import React from 'react'

const posts = [
    {
        platform: "Twitter",
        sentiment: "😊 Positive",
        text: "Love the new update!",
    },
    {
        platform: "Reddit",
        sentiment: "😡 Negative",
        text: "Customer support still not responding",
    },
    {
        platform: "App Store",
        sentiment: "😐 Neutral",
        text: "Good app but needs improvements",
    },
];

const SentimentStream = () => {
    return (
        <div className='card'>
            <h3 className="font-semibold mb-4">
                Sentiment Stream
            </h3>
            <div className="space-y-4 text-sm">
                {
                    posts.map((post, index) => (
                        <div key={index} className='border-b pb-3'>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{post.platform}</span>
                                <span>{post.sentiment}</span>
                            </div>
                            <p className="mt-1">
                                {post.text}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SentimentStream