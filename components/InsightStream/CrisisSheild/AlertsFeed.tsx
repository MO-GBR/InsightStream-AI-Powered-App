import React from 'react'
import AlertItem from './AlertItem';

const alerts = [
    {
        id: "1",
        message: "Twitter spike detected (+120 negative mentions)",
        source: "Twitter",
        severity: "CRITICAL",
        time: "03:12:22",
    },
    {
        id: "2",
        message: "Reddit thread trending about customer support",
        source: "Reddit",
        severity: "WARNING",
        time: "03:11:58",
    },
    {
        id: "3",
        message: "App store rating dropped below 3.5",
        source: "Google Play",
        severity: "CRITICAL",
        time: "03:10:14",
    },
    {
        id: "4",
        message: "App store rating dropped below 3.5",
        source: "Google Play",
        severity: "INFO",
        time: "03:10:14",
    },
];

const AlertsFeed = () => {
    return (
        <div className='rounded-t-xl border border-b-0 p-6'>
            <h3 className='font-semibold mb-4'>
                Active Alerts
            </h3>
            <div className='flex flex-col'>
                {
                    alerts.map((alert) => (
                        <AlertItem
                            key={alert.id}
                            {...alert}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AlertsFeed