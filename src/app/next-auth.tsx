import { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const STATIC_EMAIL = process.env.STATIC_EMAIL;
				const STATIC_PASSWORD = process.env.STATIC_PASSWORD;

				if (
					credentials?.email === STATIC_EMAIL &&
					credentials?.password === STATIC_PASSWORD
				) {
					return { id: "1", name: "Allen", email: credentials?.email };
				} else {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/",
	}
};