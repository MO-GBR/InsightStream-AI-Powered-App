import { prisma } from "../../prisma";

export const emitEvent = async (type: string, payload: any) => {
    await prisma.event.create({
        data: { type, payload }
    });
};