import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { updatedAt } from "~/server/db/schema/utils";
import { nanoid } from "nanoid";
import { create } from "domain";
import { url } from "inspector";
/*
create
getByTeamId
delete
*/
export const imageRouter = createTRPCRouter({
        // create
    create: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
            url: z.string(),
            createdAt: z.date(),
        })
    )
    .mutation(async ({ctx, input}) =>{
        const[image] = await ctx.db
        .insert(images)
        .values(input)
        .returning();
        if (!image) {
            return null;
        }
        return image;
    }),
        //getByTeamId
    getByTeamId: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
            url: z.string(),
            createdAt: z.string(),
        })
    )
    .mutation(async ({ctx, input}) =>{
        const image = await ctx.db
        .insert(images)
        .values({
            equipo_id: input.equipo_id,
            url: input.url,
            createdAt: new Date(),
        })
        .returning();
        if (!image) {
            return null;
        }
        return image;
    }),
        //delete
    delete: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .mutation(async ({ctx, input}) =>{
        const image = await ctx.db
        .delete(images)
        .where(eq(images.id, input.id))
        .returning();
        if (!image) {
            throw new Error("Error al eliminar la imagen");
        }
        return { success: true };
    }),
})