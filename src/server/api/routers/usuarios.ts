import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { usuarios } from "~/server/db/schema";
/*
create FUNCIONA
list FUNCIONA
get PROBAR
upload (se llama update) FUNCIONA
delete FUNCIONA
*/

export const usuariosRouter = createTRPCRouter({
    // create FUNCIONA
    create: publicProcedure
        .input(
            z.object({
                nombre: z.string(),
                legajo: z.string(),
                email: z.string(),
                telefono: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [user] = await ctx.db
                .insert(usuarios)
                .values(input)
                .returning();
            if (!user) {
                return null;
            }
            return user;
        }),
    // list FUNCIONA
    list: publicProcedure
        .query(async () => {    
            const users = await db.query.usuarios.findMany();
            return users;
        }),
        // get PROBAR
    get: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.usuarios.findFirst({
                where: eq(usuarios?.id, input.id),
            })
            if (!user) {
                throw new Error("usuario no encontrado");
            }
            return user;
        }),
        // update FUNCIONA
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                nombre: z.string(),
                legajo: z.string(),
                email: z.string(),
                telefono: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [userActualizado] = await ctx.db
                .update(usuarios)
                .set({
                    id: input.id,
                    nombre: input.nombre,
                    legajo: input.legajo,
                    email: input.email,
                    telefono: input.telefono,
                    createdAt: input.createdAt,
                    updatedAt: input.updatedAt,
                })
                .where(eq(usuarios.id, input.id))
                .returning();
            if (!userActualizado) {
                throw new Error("Error al actualizar usuario");
            }
            return userActualizado;
        }),
        // delete FUNCIONA
    delete: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [userEliminado] = await ctx.db
                .delete(usuarios)
                .where(eq(usuarios.id, input.id))
                .returning();
            if (!userEliminado) {
                throw new Error("Error al eliminar usuario");
            }
            return userEliminado;
        }),
}) 