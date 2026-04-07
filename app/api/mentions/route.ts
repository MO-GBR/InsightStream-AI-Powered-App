import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if(!projectId) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    };

    const mentions = await prisma.mention.findMany({
        where: { projectId },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ mentions });
};