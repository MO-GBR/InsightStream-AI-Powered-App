import { briefingWorker } from '@/lib/InsightStream/workers/briefingWorker';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await briefingWorker();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error });
    }
};