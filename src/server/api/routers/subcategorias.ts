

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { subcategorias } from "~/server/db/schema";

export const subcategoriasRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                categoria_id: z.number(),
                nombre: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [subcategoria] = await ctx.db
                .insert(subcategorias)
                .values({
                    categoria_id: input.categoria_id,
                    nombre: input.nombre,
                })
                .returning();
            return subcategoria;
        }),
        
        // List
    list: publicProcedure.query(({ ctx }) => {
        const subcategoria = ctx.db.query.subcategorias.findMany();
        return subcategoria;
    }),

        // Editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                categoria_id: z.number(),
                nombre: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [subcategoria] = await ctx.db
                .update(subcategorias)
                .set({
                    id: input.id,
                    categoria_id: input.categoria_id,
                    nombre: input.nombre
                })
                .where(eq(subcategorias.id, input.id))
                .returning();
                if(!subcategorias){
                    throw new Error("Categoria no encontrada");
                }
            return subcategoria
        }),

        // Eliminar
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [subcategoria] = await ctx.db
                .delete(subcategorias)
                .where(eq(subcategorias.id, input.id))
                .returning();
                if(!subcategorias){
                    throw new Error("Categoria no encontrada");
                }
            return subcategoria
        }),

});