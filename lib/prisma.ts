import { PrismaClient } from "@/lib/generated/prisma/client";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as any;

const connectionString = process.env.DIRECT_URL;

const adapter = new PrismaPg({ connectionString });

// export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

export const prisma = new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== "production") {
// 	globalForPrisma.prisma = prisma;
// }