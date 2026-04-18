import { cn } from '@/lib/utils';
import React from 'react'

interface AlertItemProps {
    message: string;
    severity: string;
    time: string;
}
  
const severityIcon = {
    LOW: "ℹ️",
    MEDIUM: "⚠️",
    HIGH: "🚨",
};
  
const severityStyles = {
    LOW: "text-blue-500",
    MEDIUM: "text-yellow-500",
    HIGH: "text-red-500",
};

const AlertItem = ({
    message,
    severity,
    time
}: AlertItemProps) => {
    return (
        <div className='flex items-start gap-4 py-3 border-b last:border-none'>
            <div className={
                cn(
                    'text-lg',
                    severityStyles[severity as keyof typeof severityStyles]
                )
            }>{severityIcon[severity as keyof typeof severityIcon]}</div>
            <div className='flex flex-col flex-1'>
                <span className='text-sm font-medium'>{message}</span>
                <span className='text-xs text-muted-foreground'>Source: RSS(News) • Reddit • Reviews</span>
            </div>
            <div className='text-xs text-muted-foreground'>
                {time}
            </div>
        </div>
    )
}

export default AlertItem