import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await auth();
    
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    let userId = session.user.id;
    
    if (userId) {
        const userById = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
    
            if (!userById) {
            userId = undefined;
        }
    }
    
    if (!userId) {
        const userByEmail = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true },
        });
    
        if (!userByEmail) {
            return NextResponse.json({ error: 'User record not found' }, { status: 401 });
        }
    
        userId = userByEmail.id;
    }

    const projects = await prisma.project.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ projects, userId: session.user.email });
};