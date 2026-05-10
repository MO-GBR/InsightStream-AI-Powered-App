import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: Request, context: { params: Promise<{ projectId: string }> }) {
    const { projectId } = context.params ? await context.params : { projectId: null };

    const session = await auth();

    if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

    const userProjects = await prisma.project.findMany({
        where: {
            userId: session?.user?.id
        }
    });

    if (userProjects.length === 0) return NextResponse.json({ error: "There is no projects found" }, { status: 400 });

    console.log('Details===', {
        userId: session?.user?.id,
        projectId,
        projects: userProjects
    });

    const briefing = await prisma.briefing.findFirst({
        where: { projectId },
        orderBy: { createdAt: 'desc' },
    });

    if (!briefing) return NextResponse.json({ error: "No briefings found" }, { status: 404 });

    return NextResponse.json({ briefing });
};