import { prisma } from "@/lib/prisma";
import { fetchRedditMentionsScraper } from "../services/posts/reddit";
import { fetchRSSMentions } from "../services/posts/RSS";

export const runIngestionWorker = async () => {
    const projects = await prisma.project.findMany();

    for(const project of projects) {
        await fetchRSSMentions(project.keyword, project.id);
        await fetchRedditMentionsScraper(project.keyword, project.id);
    }
};