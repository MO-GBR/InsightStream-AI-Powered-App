import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST (req: Request) {
    const session = await auth();
    
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const newProject = await prisma.project.create({
        data: {
            name: body.name,
            keyword: body.keyword,
            competitorKeyword: body.competitorKeyword,
            brandVoice: body.brandVoice,
            alertThreshold: body.alertThreshold ?? 20,
            userId: session.user.id
        }
    });

    return NextResponse.json({ project: newProject });
};