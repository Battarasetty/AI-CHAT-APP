// src/lib/auth.ts
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "./mongodb"; // MongoDB client

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: { prompt: "select_account" }, 
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: { prompt: "login" },
            },
        }),
    ],

    adapter: MongoDBAdapter(clientPromise),

    session: { strategy: "jwt" },

    secret: process.env.NEXTAUTH_SECRET,

    pages: { signIn: "/login" },

    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                // Google returns `sub` instead of `id`
                token.id = user.id || (user as any).sub;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    },
};
