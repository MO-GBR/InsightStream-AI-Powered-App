import { ChatMessage } from '@/types';
import React from 'react'
import ChatBlock from './ChatBlock';
import { apiFetcher } from '@/lib/utils/API_Fetcher';
import { cookies } from 'next/headers';

const mdResponse = `
# **AI Response**
This is a sample response from the AI. It can include **bold text**, *italic text*, and even [links](https://example.com).

_Bonding_ is a great way to enhance your understanding of concepts.

You can also include blocks:

\`\`\`javascript
console.log("Hello, world!");
\`\`\`
`;

const fakeMessages: ChatMessage[] = [
    {
        id: '1',
        input: 'User message',
        response: mdResponse,
        createdAt: new Date()
    },
    {
        id: '2',
        input: 'User message',
        response: mdResponse,
        createdAt: new Date()
    },
    {
        id: '3',
        input: 'User message',
        response: mdResponse,
        createdAt: new Date()
    },
    {
        id: '4',
        input: 'User message',
        response: mdResponse,
        createdAt: new Date()
    },
    {
        id: '5',
        input: 'User message',
        response: mdResponse,
        createdAt: new Date()
    }
];

const ChatWindow = async () => {
    const cookieStore = await cookies();
    const selectedProjectId = cookieStore.get('currentProjectId')?.value;

    const response = await apiFetcher(`/api/knowledge/chat?projectId=${selectedProjectId}`);
    return (
        <div className='chat-window max-h-[420px] space-y-4 overflow-y-scroll rounded-xl border p-4'>
            <ChatBlock messages={response.messages} />
        </div>
    )
}

export default ChatWindow