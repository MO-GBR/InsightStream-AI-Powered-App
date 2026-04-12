import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma";
import { loginSchema } from "./utils/Zod";
import { comparePassword } from "./utils/HandlePassword";
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: "E-Mail",
					type: "text",
					placeholder: "Write your e-mail here"
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Write your password here"
				}
			},
			authorize: async (credentials) => {
				const { email, password } = await loginSchema.parseAsync(credentials);

				console.log('email:', email, 'password:', password)

				if (!email || !password) throw new Error("Email and password are required");

				const user = await prisma.user.findUnique({
					where: { email },
				})

				if (!user) throw new Error("EMAIL_NOT_FOUND");

				const isPasswordValid = comparePassword(password, user?.password as string);
				if(!isPasswordValid) throw new Error("WRONG_PASSWORD");

				return user;
			}
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET
		}),
	],
	secret: process.env.AUTH_SECRET,
	session: {
	    strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user?.id && account?.provider === "credentials") {
				token.id = user.id;
			}

			if (account?.provider === "google") {
				const email = user?.email ?? token.email;
				if (email) {
					const dbUser = await prisma.user.findUnique({
						where: { email },
						select: { id: true },
					});

					if (dbUser?.id) token.id = dbUser.id;
				}
			}
			return token;
		},
		async session({ session, token }) {
			if(session.user) session.user.id = token.id as string;
			return session;
		},
		signIn: async ({ user, account }) => {
			if(account?.provider === "google") {
				const existingUser = await prisma.user.findUnique({
					where: { email: user.email as string },
				});

				if (!existingUser) {
					await prisma.user.create({
						data: {
							email: user.email as string,
							name: user.name as string,
							image: user.image as string,
							plan: 'Basic',
						},
					});
				} else {
					return true;
				}

				return true;
			}

			if(account?.provider === "credentials") {
				return true;
			} else {
				return false;
			}
		}
	}
});