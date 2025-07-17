import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../../prisma";
import { customSession, organization } from "better-auth/plugins";

async function getUserInfo(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      ownedWorkspaces: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    ownedWorkspaces: user.ownedWorkspaces,
  };
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      prompt: "select_account",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    organization(),
    customSession(async ({ user, session }) => {
      const userInfo = await getUserInfo(session.userId);
      return {
        user: {
          ...user,
          ownedWorkspaces: userInfo.ownedWorkspaces,
        },
        session,
      };
    }),
  ],
});
