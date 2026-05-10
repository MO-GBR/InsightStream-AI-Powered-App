//=============== TEST ENVIRONMENT (START) ==================//

// import { runCrisisWorker } from "@/lib/InsightStream/workers/crisisWorker";
// import { runIngestionWorker } from "../lib/InsightStream/workers/ingestionWorker";
// import { runAIWorker } from "@/lib/InsightStream/workers/AIWorker";
// import { briefingWorker } from "@/lib/InsightStream/workers/briefingWorker";

// // Ingestion = Reddit and RSS feed scraping.
// runIngestionWorker().then(() => {
//     console.log('Ingestion worker completed');
//     process.exit(0);
// }).catch((error) => {
//     console.error('Ingestion worker error:', error);
//     process.exit(1);
// });

// // Crisis detection = Analyze sentiment trends and detect potential crises.
// runCrisisWorker().then(() => {
//     console.log('Crisis detection worker completed');
//     process.exit(0);
// }).catch((error) => {
//     console.error('Crisis detection worker error:', error);
//     process.exit(1);
// });

// // AI Sentiment analysis = Analyze new mentions with AI to determine sentiment and potential crises.
// runAIWorker().then(() => {
//     console.log('AI worker completed');
//     process.exit(0);
// }).catch((error) => {
//     console.error('AI Worker error:', error);
//     process.exit(1);
// });

// briefingWorker().then(() => {
//     console.log('AI worker completed');
//     process.exit(0);
// }).catch((error) => {
//     console.error('AI Worker error:', error);
//     process.exit(1);
// });

//=============== TEST ENVIRONMENT (START) ==================//

/*
    How to set up cron jobs in vercel
    1. Create vercel.json
    2. add the following text

    {
        "crons": [
            {
                "path": "/api/cron/ai",
                "schedule": "0 10 * * *"
            },
            {
                "path": "/api/cron/briefing",
                "schedule": "0 10 * * *"
            },
            {
                "path": "/api/cron/cleanup",
                "schedule": "0 10 * * *"
            },
            {
                "path": "/api/cron/crisis",
                "schedule": "0 10 * * *"
            },
            {
                "path": "/api/cron/ingestion",
                "schedule": "0 10 * * *"
            },
        ]
    }
*/
