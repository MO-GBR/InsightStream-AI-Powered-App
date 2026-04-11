import { runIngestionWorker } from "../lib/InsightStream/workers/ingestionWorker";

runIngestionWorker().then(() => {
    console.log('Ingestion worker completed');
    process.exit(0);
})