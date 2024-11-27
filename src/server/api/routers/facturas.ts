

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { facturas } from "~/server/db/schema";

export const facturasRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                cliente_id: z.number(),
                fecha: z.date(),
                total: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [factura] = await ctx.db
                .insert(facturas)
                .values({
                    cliente_id: input.cliente_id,
                    fecha: input.fecha,
                    total: input.total
                })
                .returning();
            return factura;
        }),

        //Lits
    list: publicProcedure.query(({ ctx }) => {
        const factura =  ctx.db.query.facturas.findMany();
        return factura;
    }),
        
        //editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                cliente_id: z.number(),
                fecha: z.date(),
                total: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [factura] = await ctx.db
                .update(facturas)
                .set({
                    id: input.id,
                    cliente_id: input.cliente_id,
                    fecha: input.fecha,
                    total: input.total
                })
                .where(eq(facturas.id, input.id))
                .returning();
            return factura;
        }),

        //Delete
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [factura] = await ctx.db
                .delete(facturas)
                .where(eq(facturas.id, input.id))
                .returning();
            return factura;
        }),
});