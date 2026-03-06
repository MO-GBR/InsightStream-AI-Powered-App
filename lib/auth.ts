import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
 
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
				const email = credentials?.email as string | undefined;
				const password = credentials?.password as string | undefined;

				if (!email || !password) throw new Error("Email and password are required");

				return {}
			}
		})
	],
	secret: process.env.AUTH_SECRET,
	session: {
	    strategy: 'jwt',
	},
});