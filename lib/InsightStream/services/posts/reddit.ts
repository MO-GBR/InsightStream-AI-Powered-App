import { prisma } from "../../../prisma";
import Snoowrap from 'snoowrap'
import { normalizeMention } from "./normalize";

const reddit = new Snoowrap({
    userAgent: "InsightStream",
    clientId: process.env.REDDIT_CLIENT_ID!,
    clientSecret: process.env.REDDIT_SECRET!,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN!
});

export const fetchRedditMentionsAPI = async (keyword: string, projectId: string) => {
    const cursor = await prisma.sourceCursor.findUnique({
        where: {
            source_keyword_projectId: {
                source: 'reddit',
                keyword,
                projectId
            }
        }
    });

    const posts = await reddit.search({
        query: keyword,
        limit: 20,
        sort: "new"
    });

    for (const post of posts) {
        if (cursor?.lastSeen && post.id <= cursor.lastSeen) continue;
        const mentionData = normalizeMention(post, 'reddit');

        const mention = await prisma.mention.create({
            data: {
                projectId,
                source: 'Reddit',
                content: mentionData?.content,
                ...mentionData
            }
        });

        await prisma.event.create({
            data: { type: "MENTION_CREATED", payload: { mentionId: mention.id, projectId } }
        });
    }

    await prisma.sourceCursor.upsert({
        where: { source_keyword_projectId: { source: "reddit", keyword, projectId } },
        update: { lastSeen: posts[0]?.id },
        create: { source: "reddit", keyword, projectId, lastSeen: posts[0]?.id }
    });
};

export const fetchRedditMentionsScraper = async (keyword: string, projectId: string) => {};