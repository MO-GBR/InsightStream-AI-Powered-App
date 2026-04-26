import { auth } from '@/lib/auth';
import { convertDate } from '@/lib/InsightStream/utils/Date';
import { prisma } from '@/lib/prisma';
import React from 'react'
import { cookies } from 'next/headers';

const docs = [
    {
        id: 1,
        fileName: "brand_voice.pdf",
        type: "PDF",
        createdAt: "2 hours ago",
    },
    {
        id: 2,
        fileName: "support_playbook.pdf",
        type: "PDF",
        createdAt: "Yesterday",
    },
];

const VaultDocuments = async () => {
    const session = await auth();

    const documents = await prisma.document.findMany({
        where: {
            project: {
                userId: session?.user?.id
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return (
        <div className='rounded-xl border p-6'>
            <h3 className='mb-4 font-semibold'>
                Stored Documents
            </h3>
            <table className='text-sm w-full'>
                <thead className='text-muted-foreground'>
                    <tr>
                        <th className="text-left py-2">File</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Uploaded</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        documents.map((doc) => (
                            <tr key={doc.id} className='border-t'>
                                <th className='py-2 text-left'>{doc.fileName}</th>
                                <th className='text-left'>{doc.type}</th>
                                <th className='text-left'>{convertDate(doc.createdAt)}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default VaultDocuments