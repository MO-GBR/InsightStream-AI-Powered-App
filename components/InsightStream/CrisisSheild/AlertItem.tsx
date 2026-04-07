import { cn } from '@/lib/utils';
import React from 'react'

interface AlertItemProps {
    message: string;
    source: string;
    severity: "INFO" | "WARNING" | "CRITICAL";
    time: string;
}
  
const severityIcon = {
    INFO: "ℹ️",
    WARNING: "⚠️",
    CRITICAL: "🚨",
};
  
const severityStyles = {
    INFO: "text-blue-500",
    WARNING: "text-yellow-500",
    CRITICAL: "text-red-500",
};

const AlertItem = ({
    message,
    severity,
    source,
    time
}: AlertItemProps) => {
    return (
        <div className='flex items-start gap-4 py-3 border-b last:border-none'>
            <div className={
                cn(
                    'text-lg',
                    severityStyles[severity]
                )
            }>{severityIcon[severity]}</div>
            <div className='flex flex-col flex-1'>
                <span className='text-sm font-medium'>{message}</span>
                <span className='text-xs text-muted-foreground'>Source: {source}</span>
            </div>
            <div className='text-xs text-muted-foreground'>
                {time}
            </div>
        </div>
    )
}

export default AlertItem