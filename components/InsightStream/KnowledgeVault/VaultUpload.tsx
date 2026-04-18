'use client';

import { ingestDocument } from '@/lib/InsightStream/knowledge/RAG';
import { cn } from '@/lib/utils';
import { useProjectStore } from '@/lib/zustand/ProjectStore';
import React, { useEffect, useRef, useState } from 'react'

// Timing Constants (in milliseconds)
const SHARE_STATUS_RESET_DELAY_MS = 1500;
const PROGRESS_INCREMENT = 15;
const REDIRECT_DELAY_MS = 600;
const PROGRESS_INTERVAL_MS = 100;
const PROGRESS_STEP = 5;

const VaultUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);

    const { currentProject } = useProjectStore();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const processFile = (selectedFile: File) => {
        setFile(selectedFile);
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result as string;

            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + PROGRESS_STEP;

                    if(next >= 100) {
                        clearInterval(intervalRef.current!);
                        return 100;
                    }
                    return next;
                })
            }, PROGRESS_INTERVAL_MS);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
    
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            processFile(droppedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        ingestDocument(file, currentProject?.id || '');
    };

    if(!file) {
        return (
            <div 
                className={
                    cn(
                        'border rounded-2xl border-dashed p-10 flex-center text-center flex-col transition-all duration-500',
                        isDragging && 'bg-white text-black border-double border-black'
                    )
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <h3 className='text-lg font-semibold mb-2'>Upload Document</h3>
                <p className='text-sm text-muted-foreground mb-4'>
                    Drag & drop a file here or click to upload
                </p>
                {
                    !isDragging && (
                        <input type='file' name='file' onChange={handleChange} className='border p-2 rounded-2xl bg-black'/>
                    )
                }
                <p className='text-xs text-muted-foreground mt-3'>
                    Supported formats: PDF, DOCX, TXT
                </p>
            </div>
        )
    } else {
        return (
            <div className='card'>
                <div>
                    {
                        progress ? (
                            <div
                                className="bg-blue-500 h-full transition-all duration-200"
                                style={{ width: `${progress}%` }}
                            />
                        ) : (
                            <div className="bg-green-500 h-full w-full transition-all duration-200" />
                        )
                    }
                </div>
                <div>
                    {
                        progress < 100
                            ? `Processing: ${progress}%`
                            : progress === 100 && (
                                <div>
                                    <p>File: {file.name}</p>
                                    <p>Size: {file.size}</p>
                                    <div className='flex gap-2'>
                                        <button className='bg-gray-900 p-3 my-2' onClick={() => setFile(null)}>Remove File</button>
                                        <button className='border p-3 my-2' onClick={handleUpload}>Confirm File</button>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default VaultUpload