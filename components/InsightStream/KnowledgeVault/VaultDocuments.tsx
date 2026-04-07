import React from 'react'

const documents = [
    {
        id: 1,
        name: "brand_voice.pdf",
        type: "PDF",
        uploaded: "2 hours ago",
    },
    {
        id: 2,
        name: "support_playbook.pdf",
        type: "PDF",
        uploaded: "Yesterday",
    },
];

const VaultDocuments = () => {
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
                                <th className='py-2 text-left'>{doc.name}</th>
                                <th className='text-left'>{doc.type}</th>
                                <th className='text-left'>{doc.uploaded}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default VaultDocuments