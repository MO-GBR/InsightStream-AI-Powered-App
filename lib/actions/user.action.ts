'use server';

import { signIn } from '@/lib/auth';
import { loginSchema } from '../utils/Zod';

export const loginAction = async (prevState: any, formdata: FormData) => {
    const result = loginSchema.safeParse({
        email: formdata.get('email'),
        password: formdata.get('password')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await signIn("credentials", {
            email: result.data.email,
            password: result.data.password,
            redirect: false,
        });

        console.log('Login successful for email:', result.data.email);
      
        return { success: true };
    } catch (error) {
        console.log('Handle login error:', error);
        return {
            errors: {
                email: ["Invalid email"],
                password: ["Invalid password"],
            },
        }
    }
};

export const googleLoginAction = async () => {
    await signIn("google")
}