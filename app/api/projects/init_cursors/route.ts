import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const projectId = body?.projectId as string | undefined;
    const keyword = body?.keyword as string | undefined;

    if (!projectId || !keyword) {
        return NextResponse.json({ error: 'projectId and keyword are required' }, { status: 400 });
    }

    const created = await prisma.$transaction([
        prisma.sourceCursor.upsert({
            where: {
                source_keyword_projectId: {
                    source: 'Reddit',
                    keyword,
                    projectId,
                },
            },
            update: {
                keyword,
            },
            create: {
                projectId,
                source: 'Reddit',
                keyword,
                lastSeen: null,
            },
        }),
        prisma.sourceCursor.upsert({
            where: {
                source_keyword_projectId: {
                    source: 'RSS',
                    keyword,
                    projectId,
                },
            },
            update: {
                keyword,
            },
            create: {
                projectId,
                source: 'RSS',
                keyword,
                lastSeen: null,
            },
        }),
    ]);

    return NextResponse.json({ cursors: created });
}
