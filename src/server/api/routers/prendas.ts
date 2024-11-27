

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prendas } from "~/server/db/schema";

export const prendasRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                categoria_id: z.number(),
                subcategoria_id: z.number(),
                nombre: z.string(),
                precio: z.number(),
                fecha_ingreso: z.date(),
                es_carrusel: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [respuesta] = await ctx.db
                .insert(prendas)
                .values({
                    categoria_id: input.categoria_id,
                    subcategoria_id: input.subcategoria_id,
                    nombre: input.nombre,
                    precio: input.precio,
                    fecha_ingreso: input.fecha_ingreso,
                    es_carrusel: input.es_carrusel
                })
                .returning();
            return respuesta;
        }),
        
        //Lits
    list: publicProcedure.query(({ ctx }) => {
        const prenda =  ctx.db.query.prendas.findMany();
        return prenda;
    }),
        
        //editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                categoria_id: z.number(),
                subcategoria_id: z.number(),
                nombre: z.string(),
                precio: z.number(),
                fecha_ingreso: z.date(),
                es_carrusel: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [prenda] = await ctx.db
                .update(prendas)
                .set({
                    id: input.id,
                    categoria_id: input.categoria_id,
                    subcategoria_id: input.subcategoria_id,
                    nombre: input.nombre,
                    precio: input.precio,
                    fecha_ingreso: input.fecha_ingreso,
                    es_carrusel: input.es_carrusel
                })
                .where(eq(prendas.id, input.id))
                .returning();
            return prenda;
        }),

        //Delete
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [prenda] = await ctx.db
                .delete(prendas)
                .where(eq(prendas.id, input.id))
                .returning();
            return prenda;
        }),

});