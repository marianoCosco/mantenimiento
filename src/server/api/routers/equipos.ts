import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { equipos } from "~/server/db/schema";

export const equiposRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(equipos).values({
        name: input.name,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const equipos = await ctx.db.query.equipos.findFirst({
      orderBy: (equipos, { desc }) => [desc(equipos.createdAt)],
    });

    return equipos ?? null;
  }),
});
