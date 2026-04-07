import VaultDocuments from '@/components/InsightStream/KnowledgeVault/VaultDocuments'
import VaultStats from '@/components/InsightStream/KnowledgeVault/VaultStats'
import VaultUpload from '@/components/InsightStream/KnowledgeVault/VaultUpload'
import React from 'react'

const KnowledgeVault = () => {
    return (
        <div className='space-y-6 p-5'>
            <h1 className="text-3xl font-bold">
                Knowledge Vault
            </h1>
            <VaultUpload />
            <VaultDocuments />
            <VaultStats />
        </div>
    )
}

export default KnowledgeVault