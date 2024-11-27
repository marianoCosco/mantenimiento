

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { itemFactura } from "~/server/db/schema";

export const itemFacturaRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                factura_id: z.number(),
                prenda_id: z.number(),
                cantidad: z.number(),
                precio: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [itemFacturas] = await ctx.db
                .insert(itemFactura)
                .values({
                    factura_id: input.factura_id,
                    prenda_id: input.prenda_id,
                    cantidad: input.cantidad,
                    precio: input.precio
                })
                .returning();
            return itemFacturas;
        }),
        
        //Lits
    list: publicProcedure.query(({ ctx }) => {
        const itemFacturas =  ctx.db.query.itemFactura.findMany();
        return itemFacturas;
    }),
        
        //editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                factura_id: z.number(),
                prenda_id: z.number(),
                cantidad: z.number(),
                precio: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [itemFacturas] = await ctx.db
                .update(itemFactura)
                .set({
                    id: input.id,
                    factura_id: input.factura_id,
                    prenda_id: input.prenda_id,
                    cantidad: input.cantidad,
                    precio: input.precio
                })
                .where(eq(itemFactura.id, input.id))
                .returning();
            return itemFacturas;
        }),

        //Delete
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [itemFacturas] = await ctx.db
                .delete(itemFactura)
                .where(eq(itemFactura.id, input.id))
                .returning();
            return itemFacturas;
        }),

});