import { prisma } from "../../../prisma";
import Snoowrap from 'snoowrap'
import { normalizeMention } from "./normalize";
import { emitEvent } from "../../utils/workerUtils";

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
                source: 'Reddit',
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
        where: { source_keyword_projectId: { source: "Reddit", keyword, projectId } },
        update: { lastSeen: posts[0]?.id },
        create: { source: "Reddit", keyword, projectId, lastSeen: posts[0]?.id }
    });
};

export const fetchRedditMentionsScraper = async (keyword: string, projectId: string) => {
    const cursor = await prisma.sourceCursor.findUnique({
        where: {
            source_keyword_projectId: {
                source: 'Reddit',
                keyword,
                projectId
            }
        }
    });

    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
        keyword
    )}&sort=new&limit=25`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "InsightStream/1.0 (by u/mogabr7)"
        }
    });

    if (!response.ok) {
        console.error(`Reddit API error: ${response.statusText}`);
        return;
    }

    const data = await response.json();
    const posts = data.data.children;

    const newMentions = [];

    for (const post of posts) {
        const postData = post.data;

        // stop when reaching last seen
        if (cursor?.lastSeen === postData.id) break;

        const mentionData = normalizeMention(postData, 'reddit');

        newMentions.push({
            projectId,
            source: "Reddit",
            content: mentionData?.content,
            externalId: postData.id,
            url: `https://reddit.com${postData.permalink}`,
            ...mentionData
        });
    }

    if (newMentions.length > 0) {
        for (const mention of newMentions) {
            const createdMention = await prisma.mention.create({
                data: mention
            });

            emitEvent("MENTION_CREATED", { mentionId: createdMention.id, projectId });
        }
    };

    await prisma.sourceCursor.upsert({
        where: {
            source_keyword_projectId: {
                source: "Reddit",
                keyword,
                projectId
            }
        },
        update: { lastSeen: posts[0]?.data?.id },
        create: {
            source: "Reddit",
            keyword,
            projectId,
            lastSeen: posts[0]?.data?.id
        }
    });
};