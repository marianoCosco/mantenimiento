

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clientes } from "~/server/db/schema";

export const clientesRouter = createTRPCRouter({
        // Create
    create: publicProcedure
        .input(
            z.object({ 
                nombre: z.string(),
                direccion: z.string(),
                telefono: z.string(),
                ultimaCompra: z.number(),
                bonus: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [cliente] = await ctx.db
                .insert(clientes)
                .values({
                    nombre: input.nombre,
                    direccion: input.direccion,
                    telefono: input.telefono,
                    ultimaCompra: input.ultimaCompra,
                    bonus: input.bonus
                })
                .returning();
            return cliente;
        }),

        // List
    list: publicProcedure.query(async ({ ctx }) => {
        const cliente = await ctx.db.query.clientes.findMany();
        return cliente;
    }),
        
        // Editar
    edit: publicProcedure
        .input(
            z.object({
                id: z.number(),
                nombre: z.string(),
                direccion: z.string(),
                telefono: z.string(),
                ultimaCompra: z.number(),
                bonus: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [cliente] = await ctx.db
                .update(clientes)
                .set({
                    id: input.id,
                    nombre: input.nombre,
                    direccion: input.direccion,
                    telefono: input.telefono,
                    ultimaCompra: input.ultimaCompra,
                    bonus: input.bonus
                })
                .where(eq(clientes.id, input.id))
                .returning();
                if (!cliente) {
                    return null;
                }
            return cliente;
    }),

        // Delete
    delete: publicProcedure 
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [cliente] = await ctx.db
                .delete(clientes)
                .where(eq(clientes.id, input.id))
                .returning();
                if (!cliente) {
                    return null;
                }
            return cliente;
        })
});