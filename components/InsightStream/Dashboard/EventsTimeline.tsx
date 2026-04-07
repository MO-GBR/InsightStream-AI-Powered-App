'use client';

import { EventType } from '@/types'
import gsap from 'gsap';
import React, { useEffect } from 'react'
// { events }: { events: EventType[] }

const events: EventType[] = [
    {
        type: "sentiment_drop",
        sentimentChange: -0.23,
        timestamp: "2026-03-08T12:42",
        keyword: "battery overheating",
        mentionsSpike: 340,
        explanation: "Rumors about iPhone 17 battery issues caused negative reactions."
    },
    {
        type: "sentiment_drop",
        sentimentChange: -0.23,
        timestamp: "2026-03-08T12:42",
        keyword: "battery overheating",
        mentionsSpike: 340,
        explanation: "Rumors about iPhone 17 battery issues caused negative reactions."
    },
    {
        type: "sentiment_drop",
        sentimentChange: -0.23,
        timestamp: "2026-03-08T12:42",
        keyword: "battery overheating",
        mentionsSpike: 340,
        explanation: "Rumors about iPhone 17 battery issues caused negative reactions."
    }
];
const EventsTimeline = () => {
    useEffect(() => {
        gsap.fromTo(".timeline-event", {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.5
        }, {
            opacity: 1,
            y: 0
        })
    }, [])
    
    return (
        <div className="timeline-card">
            <h3 className='text-white my-3'>
                AI Event Timeline
            </h3>
            {
                events.map((e, idx) => (
                    <div key={idx} className='flex items-start gap-[12px] mb-[18px] timeline-event'>
                        <div className='w-[10px] h-[10px] rounded-full bg-[#10b981]' />
                        <div>
                            <p>{e.type}</p>
                            <p>{e.explanation}</p>
                            <p>{e.keyword}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default EventsTimeline