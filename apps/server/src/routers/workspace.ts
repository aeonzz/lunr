import { TRPCError } from "@trpc/server";
import prisma from "../../prisma";
import { protectedProcedure, router } from "../lib/trpc";
import { z } from "zod/v4";

export const workspaceRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        ownerId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const workspace = await prisma.workspace.create({
        data: input,
      });

      return { workspace };
    }),
});
