import { runCleanupWorker } from '@/lib/InsightStream/workers/cleanupWorker';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await runCleanupWorker();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error });
    }
};