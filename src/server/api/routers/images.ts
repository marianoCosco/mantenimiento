import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { images } from "~/server/db/schema";
/*
create FUNCIONA
get Funciona
edit FUNCIONA
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
        // get FUNCIONA
    get: publicProcedure
    .input(
        z.object({
            id: z.string(),
        }),
    )
    .query(async ({ctx, input}) => {
        const image = await ctx.db.query.images.findFirst({
            where: eq(images.id, input.id),
        });
        
        if (!image) {
            throw new Error("Error al obtener la imagen");
        }
        return image;
    }),
        //update FUNCIONA
    update: publicProcedure
    .input(
        z.object({
            id: z.string(),
            equipo_id: z.string(),
            url: z.string(),
            createdAt: z.date(),
        })
    )
    .mutation(async ({ctx, input}) =>{
        const [image] = await ctx.db
        .update(images)
        .set({
            id: input.id,
            equipo_id: input.equipo_id,
            url: input.url,
            createdAt: input.createdAt
        })
        .where(eq(images.id, input.id))
        .returning();
        if (!image) {
            throw new Error("Error al editar la imagen");
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