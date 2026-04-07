import { runIngestionWorker } from '@/lib/InsightStream/workers/ingestionWorker';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await runIngestionWorker();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error });
    }
};