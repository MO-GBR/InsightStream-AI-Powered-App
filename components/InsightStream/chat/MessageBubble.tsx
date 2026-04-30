import { cn } from '@/lib/utils';
import React from 'react'

type MessageBubbleProps = {
    role: "user" | "bot";
    children: React.ReactNode;
};

const MessageBubble = ({ role, children }: MessageBubbleProps) => {
    return (
        <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
            <div
                className={
                    cn(
                        "message-bubble",
                        {
                            "message-bubble-user": role === "user",
                            "message-bubble-bot": role === "bot",
                        }
                    )
                }
            >{children}</div>
        </div>
    )
}

export default MessageBubble