import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,

      mapProfileToUser: async (profile: any) => ({
        email: profile.email ?? `${profile.id}@users.noreply.github.com`, //while using agithub to get the access of email
        name: profile.name ?? profile.login, //while using agithub to get the access of name
      }),
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
