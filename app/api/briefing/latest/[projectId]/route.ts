import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: Request, context: { params: Promise<{ projectId: string }> }) {
    const { projectId } = context.params ? await context.params : { projectId: null };

    if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

    const briefing = await prisma.briefing.findFirst({
        where: { projectId },
        orderBy: { createdAt: 'desc' },
    });

    if (!briefing) return NextResponse.json({ error: "No briefings found" }, { status: 404 });

    return NextResponse.json({ briefing });
};