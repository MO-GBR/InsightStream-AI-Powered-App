import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/utils/HandlePassword';
import { registerSchema } from '@/lib/utils/Zod';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: 'Validation failed.',
                    fields: parsed.error.flatten().fieldErrors,
                },
                { status: 400 },
            );
        }

        const plan = typeof body.plan === 'string' && body.plan.trim() ? body.plan : 'Basic';

        const password = hashPassword(parsed.data.password);

        const existingUser = await prisma.user.findUnique({
            where: { email: parsed.data.email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email is already registered.' }, { status: 409 });
        }

        const user = await prisma.user.create({
            data: {
                email: parsed.data.email,
                name: parsed.data.name,
                password,
                plan
            }
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        const isDuplicateEmailError =
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            typeof error.code === 'string' &&
            error.code === 'P2002';

        if (isDuplicateEmailError) {
            return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
        }

        return NextResponse.json({ error: 'An error occurred while registering the user.' }, { status: 500 });  
    }
};