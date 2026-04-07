import { prisma } from "@/lib/prisma";

export const runCleanupWorker = async () => {
    const THIRTY_DAYS = new Date();
    THIRTY_DAYS.setDate(THIRTY_DAYS.getDate() - 30);

    const SEVEN_DAYS = new Date();
    SEVEN_DAYS.setDate(SEVEN_DAYS.getDate() - 30);

    // Delete old analysis
    await prisma.analysis.deleteMany({
        where: {
            createdAt: {
                lt: THIRTY_DAYS
            }
        }
    });

    // Delete old mentions
    await prisma.mention.deleteMany({
        where: {
            createdAt: {
                lt: THIRTY_DAYS
            }
        }
    });

    // Delete old events
    await prisma.event.deleteMany({
        where: {
            createdAt: {
            lt: SEVEN_DAYS
        }
    }
  });
};