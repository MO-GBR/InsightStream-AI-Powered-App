import React from 'react'
import AlertItem from './AlertItem';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const AlertsFeed = async () => {
    const session = await auth();
    const Alerts = await prisma.crisis.findMany({
        where: {
            project: {
                userId: session?.user?.id
            }
        }
    });
    return (
        <div className='rounded-t-xl border border-b-0 p-6'>
            <h3 className='font-semibold mb-4'>
                Active Alerts
            </h3>
            <div className='flex flex-col'>
                {
                    Alerts.length > 0
                        ? (
                            Alerts.map((alert) => (
                                <AlertItem
                                    key={alert.id}
                                    message={alert.message}
                                    severity={alert.severity}
                                    time={alert.createdAt.toLocaleString()}
                                />
                            ))
                        )
                        : (
                            <div className='text-sm text-muted-foreground py-10 text-center'>
                                No active alerts. Your project is safe! 🎉
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default AlertsFeed