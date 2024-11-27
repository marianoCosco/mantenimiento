

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categorias } from "~/server/db/schema";

export const categoriasRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                nombre: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [respuesta] = await ctx.db
                .insert(categorias)
                .values({
                    nombre: input.nombre,
                })
                .returning();
            return respuesta;
        }),
    
        // List
    list: publicProcedure.query(({ ctx }) => {
        const categoria = ctx.db.query.categorias.findMany();
        return categoria;
    }),

        // Editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                nombre: z.string(), 
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [categoria] = await ctx.db
                .update(categorias)
                .set({
                    id: input.id,
                    nombre: "Editado",
                })
                .where(eq(categorias.id, input.id))
                .returning();
                if(!categoria){
                    throw new Error("Categoria no encontrada");
                }
            return categoria
        }),

        // Eliminar
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [categoria] = await ctx.db
                .delete(categorias)
                .where(eq(categorias.id, input.id))
                .returning();
                if(!categoria){
                    throw new Error("Categoria no encontrada");
                }
            return categoria
        }),

});