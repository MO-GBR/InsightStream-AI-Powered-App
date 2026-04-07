import { createBriefing } from '@/lib/InsightStream/briefing/createBriefing';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { projectId } = await request.json();

    if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

    const briefing = await createBriefing(projectId);

    return NextResponse.json({ briefing });
};