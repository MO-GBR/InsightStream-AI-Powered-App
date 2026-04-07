import { runAIWorker } from '@/lib/InsightStream/workers/AIWorker';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await runAIWorker()
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error });
    }
};