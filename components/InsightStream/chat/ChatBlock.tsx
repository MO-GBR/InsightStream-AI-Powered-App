import { convertDate } from '@/lib/InsightStream/utils/Date'
import { ChatMessage } from '@/types'
import React from 'react'
import { BotMessage, UserMessage } from './Messages'

const ChatBlock = ({ messages }: { messages: ChatMessage[] }) => {
    return (
        <div className=''>
            {
                messages.length === 0
                    ? (
                        <p className='text-sm text-muted-foreground'>No conversations yet. Ask your first question.</p>
                    )
                    : (
                        messages.map((message) => (
                            <div key={message.id} className='space-y-2 rounded-lg bg-zinc-900/40 p-3'>
                                <UserMessage content={message.input} />
                                <BotMessage content={message.response} />
                                <p className='text-xs text-gray-700'>
                                    {
                                        convertDate(message.createdAt)
                                    }
                                </p>
                            </div>
                        ))
                    )
            }
        </div>
    )
}

export default ChatBlock