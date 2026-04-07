import React from 'react'

const MentionRateCard = () => {
    return (
        <div className='card'>
            <p className="text-sm text-muted-foreground">
                Mentions / Minute
            </p>
            <p className="text-4xl font-bold mt-2">
                134
            </p>
            <p className="text-green-500 text-sm mt-2">
                ↑ +18%
            </p>
        </div>
    )
}

export default MentionRateCard