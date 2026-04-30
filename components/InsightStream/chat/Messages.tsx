'use client';

import React from 'react'

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import CodeBlock from './CodeBlock';
import LinkBlock from './LinkBlock';
import MessageBubble from './MessageBubble';

export const UserMessage = ({ content }: { content: string }) => {
    return (
        <MessageBubble role='user'>{content}</MessageBubble>
    )
};

export const BotMessage = ({ content }: { content: string }) => {
    return (
        <MessageBubble role='bot'>
            <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        a({ node, ...props }: any) {
                            return (
                                <LinkBlock text={props.children} url={props.href} />
                            )
                        }                        
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </MessageBubble>
    )
};