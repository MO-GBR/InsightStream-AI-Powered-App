'use client';

import React, { useState } from 'react'

type CodeBlockProps = {
    language?: string;
    code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
    const [ isCopied, setIsCopied ] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };
    
    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
            >
                {
                    isCopied ? "✔ Copied!" : "❐ Copy"
                }
            </button>
            <div className='absolute top-1 left-2 text-xs text-white'>{language}</div>
            <pre className="overflow-auto rounded-lg bg-[#0d1117] text-white p-5 pt-7 text-sm">
                <code className={`language-${language ?? ''}`}>
                    {code}
                </code>
            </pre>
        </div>
    )
}

export default CodeBlock