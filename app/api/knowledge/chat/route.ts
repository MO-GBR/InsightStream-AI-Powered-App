import { askRAG } from '@/lib/InsightStream/knowledge/RAG';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        if (!projectId?.trim()) {
            return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
        }

        const messages = await prisma.conversationMemory.findMany({
            where: { projectId },
            orderBy: { createdAt: 'asc' },
            take: 50,
        });

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { projectId, query } = await request.json();

        if (typeof projectId !== 'string' || !projectId.trim()) {
            return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
        }

        if (typeof query !== 'string' || !query.trim()) {
            return NextResponse.json({ error: 'Missing query' }, { status: 400 });
        }

        const response = await askRAG(projectId, query);

        if (!response) {
            return NextResponse.json({ error: 'No response generated' }, { status: 500 });
        }

        const message = await prisma.conversationMemory.findFirst({
            where: {
                projectId,
                input: query,
                response: response as string
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ message }, { status: 200 });
    } catch (error) {
        console.error('Error processing knowledge chat:', error);
        return NextResponse.json({ error: 'Failed to process knowledge chat' }, { status: 500 });
    }
}
