import React from 'react'

const CrisisShieldHeader = () => {
    return (
        <div className='flex-center flex-col gap-2 mb-8 border-b bg-red-950 m-3 rounded-2xl'>
            <h1 className='text-3xl font-bold'>🛡 Crisis Shield</h1>
            <p className='text-muted-foreground text-xs font-bold text-red-300 mb-2'>Real-time monitoring of brand reputation. Detect negative sentiment spikes before they escalate.</p>
        </div>
    )
}

export default CrisisShieldHeader