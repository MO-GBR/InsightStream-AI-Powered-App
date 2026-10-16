import React from 'react'

const Logo = ({ square, dot }: { square: string; dot: string }) => {
    return (
        <span className={`relative flex ${square} items-center justify-center`}>
            <span className="absolute inset-0 rotate-45 border border-[#0fff37]" />
            <span className={`${dot} rounded-full bg-[#0fff37] shadow-[0_0_15px_#0fff37]`} />
        </span>
    )
}

export default Logo