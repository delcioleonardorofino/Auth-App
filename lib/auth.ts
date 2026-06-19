import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { nextCookies } from "better-auth/next-js";

// 1. Initialize the raw PG pool driver for the driver adapter
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// 2. Pass the adapter instance into your custom Prisma Client configuration
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
    //  FIXED: Passed prismaAdapter directly without the extra nested object wrapper
    database: prismaAdapter(prisma, {
        provider: 'postgresql'
    }),
    
    emailAndPassword: {
        enabled: true
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        },
    },
    accountLinking: {
        enabled: true,
        trustedProviders: ['github', 'google'],
    },
    plugins: [nextCookies()]
});