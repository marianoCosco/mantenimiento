

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { imagenes } from "~/server/db/schema";

export const imagesRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                url: z.string(),
                prenda_id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [image] = await ctx.db
                .insert(imagenes)
                .values({
                    url: input.url,
                    prenda_id: input.prenda_id
                })
                .returning();
            return image;
        }),
        
        //Lits
    list: publicProcedure.query(({ ctx }) => {
        const image =  ctx.db.query.imagenes.findMany();
        return image;
    }),
        
        //editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                url: z.string(),
                prenda_id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [image] = await ctx.db
                .update(imagenes)
                .set({
                    id: input.id,
                    url: input.url,
                    prenda_id: input.prenda_id
                })
                .where(eq(imagenes.id, input.id))
                .returning();
            return image;
        }),

        //Delete
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [image] = await ctx.db
                .delete(imagenes)
                .where(eq(imagenes.id, input.id))
                .returning();
            return image;
        }),

});