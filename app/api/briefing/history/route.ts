import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');

    if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

    const briefings = await prisma.briefing.findMany({
        where: { projectId },
        orderBy: { createdAt: 'desc' },
        take: 10, // Limit to latest 10 briefings
    });

    return NextResponse.json({ briefings });
}