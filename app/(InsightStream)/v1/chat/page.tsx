import ChatInput from '@/components/InsightStream/chat/ChatInput'
import ChatWindow from '@/components/InsightStream/chat/ChatWindow'
import React from 'react'

const ChatPage = () => {
    return (
        <section className='space-y-4 rounded-2xl border p-4 m-2'>
            <h2 className='text-xl font-semibold'>Knowledge Chat</h2>
            {true && (
                <p className='text-sm text-muted-foreground'>Select a project to start chatting with your knowledge vault.</p>
            )}
            <ChatWindow />
            <ChatInput />
        </section>
    )
}

export default ChatPage