import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { images } from "~/server/db/schema";
/*
create FUNCIONA
list FUNCIONA
delete FUNCIONA
*/
export const imageRouter = createTRPCRouter({
        // create FUNCIONA
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
        //list FUNCIONA
    list: publicProcedure
    .query(async({ ctx}) => {
        const images = await ctx.db.query.images.findMany();
        return images
    }),
        //delete FUNCIONA
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