import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = context.params ? await context.params : { id: null };

    if(!id) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    };

    const mentions = await prisma.mention.findMany({
        where: { projectId: id },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ mentions });
};