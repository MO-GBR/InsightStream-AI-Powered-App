'use client';

import { apiFetcher } from '@/lib/utils/API_Fetcher';
import { useProjectStore } from '@/lib/zustand/ProjectStore';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation'

const ChatInput = () => {
    const { currentProject } = useProjectStore();
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const projectId = currentProject?.id;

    const router = useRouter();

    const hasProject = useMemo(() => Boolean(projectId), [projectId]);

    const handleAsk = async (e: FormEvent) => {
        e.preventDefault();
        if (!projectId || !question.trim() || isLoading) return;

        try {
            setIsLoading(true);

            await apiFetcher('/api/knowledge/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  projectId,
                  query: question.trim(),
                }),
            });
        } catch (error) {
            console.log('Ask Error:', error)
        } finally {
            setIsLoading(false);
            setQuestion('');
            router.refresh();
        }
    };
    return (
        <form className='flex gap-2' onSubmit={handleAsk}>
            <input
                className='w-full rounded-md border bg-transparent p-2 text-sm'
                placeholder='Ask anything from your knowledge vault...'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={!hasProject || isLoading}
            />
            <button
              type='submit'
              className='rounded-md border px-4 py-2 text-sm disabled:opacity-60'
              disabled={!hasProject || isLoading || !question.trim()}
            >
              {isLoading ? 'Thinking...' : 'Ask'}
            </button>
        </form>
    )
}

export default ChatInput