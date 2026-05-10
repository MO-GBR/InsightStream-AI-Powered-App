import { runCrisisWorker } from '@/lib/InsightStream/workers/crisisWorker';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await runCrisisWorker();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error });
    }
};