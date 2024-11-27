

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ofertas } from "~/server/db/schema";

export const ofertasRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                fecha_inicio: z.date(),
                fecha_fin: z.date(),
                porcentaje: z.number(),
                prenda_id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [oferta] = await ctx.db
                .insert(ofertas)
                .values({
                    fecha_inicio: input.fecha_inicio,
                    fecha_fin: input.fecha_fin,
                    porcentaje: input.porcentaje,
                    prenda_id: input.prenda_id
                })
                .returning();
            return oferta;
        }),
        
        //Lits
    list: publicProcedure.query(({ ctx }) => {
        const oferta =  ctx.db.query.ofertas.findMany();
        return oferta;
    }),
        
        //editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                fecha_inicio: z.date(),
                fecha_fin: z.date(),
                porcentaje: z.number(),
                prenda_id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [oferta] = await ctx.db
                .update(ofertas)
                .set({
                    id: input.id,
                    fecha_inicio: input.fecha_inicio,
                    fecha_fin: input.fecha_fin,
                    porcentaje: input.porcentaje,
                    prenda_id: input.prenda_id
                })
                .where(eq(ofertas.id, input.id))
                .returning();
            return oferta;
        }),

        //Delete
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [oferta] = await ctx.db
                .delete(ofertas)
                .where(eq(ofertas.id, input.id))
                .returning();
            return oferta;
        }),

});