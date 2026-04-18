import { ingestDocument } from "@/lib/InsightStream/knowledge/RAG";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const projectId = formData.get("projectId");
        const file = formData.get("file");

        if (typeof projectId !== "string" || !projectId.trim()) {
            return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
        }

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "Missing file" }, { status: 400 });
        }

        const documentId = await ingestDocument(file, projectId);

        return NextResponse.json({ documentId }, { status: 200 });
    } catch (error) {
        console.error("Error ingesting knowledge document:", error);
        return NextResponse.json({ error: "Failed to ingest document" }, { status: 500 });
    }
}
