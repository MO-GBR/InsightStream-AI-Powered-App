import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
	_: Request,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const project = await prisma.project.findUnique({
        where: { id },
    });
	return NextResponse.json({ project });
};