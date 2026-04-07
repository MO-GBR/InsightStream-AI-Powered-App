import { prisma } from "@/lib/prisma";
import Parser from "rss-parser";
import { normalizeMention } from "./normalize";
import { emitEvent } from "../../utils/workerUtils";

const parser = new Parser();

export const fetchRSSMentions = async (keyword: string, projectId: string) => {
    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}`;

    const feed = await parser.parseURL(feedUrl);

    const cursor = await prisma.sourceCursor.findUnique({
        where: {
            source_keyword_projectId: {
                source: "rss",
                keyword,
                projectId
            }
        }
    });

    for (const item of feed.items) {
        const mentionData = normalizeMention(item, 'rss');

        if (cursor?.lastSeen && item.pubDate && item.pubDate <= cursor.lastSeen) continue;

        try {
            const mention = await prisma.mention.create({
                data: {
                    ...mentionData,
                    source: 'News',
                    content: mentionData?.content,
                    projectId
                }
            });

            await emitEvent("MENTION_CREATED", {
                mentionId: mention.id,
                projectId
            });

        } catch (error) {
            console.log('error >>>', error);
            continue;
        }
    }

    const latestDate = feed.items?.[0]?.pubDate;

    if(latestDate) {
        await prisma.sourceCursor.upsert({
            where: {
                source_keyword_projectId: {
                    source: "rss",
                    keyword,
                    projectId
                }
            },
            update: {
                lastSeen: latestDate
            },
            create: {
                source: "rss",
                keyword,
                projectId,
                lastSeen: latestDate
            }
        })
    }
};