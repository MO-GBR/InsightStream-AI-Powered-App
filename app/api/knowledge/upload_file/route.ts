import { ingestDocument } from '@/lib/InsightStream/knowledge/RAG';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }
        await ingestDocument(file)
        return NextResponse.json({ success: true, name: file.name }, { status: 200 });
    } catch (error) {
        console.log('Error >>>>>', error);
        return NextResponse.json({ error }, { status: 500 });
    }
};