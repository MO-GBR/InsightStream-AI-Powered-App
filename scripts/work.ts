import { runCrisisWorker } from "@/lib/InsightStream/workers/crisisWorker";
import { runIngestionWorker } from "../lib/InsightStream/workers/ingestionWorker";
import { runAIWorker } from "@/lib/InsightStream/workers/AIWorker";

// Ingestion = Reddit and RSS feed scraping.
// runIngestionWorker().then(() => {
//     console.log('Ingestion worker completed');
//     process.exit(0);
// }).catch((error) => {
//     console.error('Ingestion worker error:', error);
//     process.exit(1);
// });

// Crisis detection = Analyze sentiment trends and detect potential crises.
// runCrisisWorker().then(() => {
//     console.log('Crisis detection worker completed');
//     process.exit(0);
// }).catch((error) => {
//     console.error('Crisis detection worker error:', error);
//     process.exit(1);
// });

// AI Sentiment analysis = Analyze new mentions with AI to determine sentiment and potential crises.
runAIWorker().then(() => {
    console.log('AI worker completed');
    process.exit(0);
}).catch((error) => {
    console.error('AI Worker error:', error);
    process.exit(1);
});