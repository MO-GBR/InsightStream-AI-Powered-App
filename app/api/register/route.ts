import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
        const {
            email,
            name,
            image,
            plan,
            subscribed
        } = await req.json();
        
        // Here you would typically save the user to your database
        const user = await prisma.user.create({
            data: {
                email,
                name,
                image,
                plan,
            }
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while registering the user.' }, { status: 500 });  
    }
};