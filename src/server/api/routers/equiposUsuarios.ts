

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { equipoUsuarios } from "~/server/db/schema";

/*
create FUNCIONA
list FUNCIONA
get PROBAR
update FUNCIONA
delete FUNCIONA
*/

export const equipoUsuariosRouter = createTRPCRouter({
    // create FUNCIONA
    create: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
            usuario_id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [equipoUsuario] = await ctx.db
        .insert(equipoUsuarios)
        .values(input)
        .returning();
        if (!equipoUsuario) {
            return null;
        }
        return equipoUsuario;
    }),
    // list FUNCIONA    
    list: publicProcedure
    .query(async ({ ctx }) => {
        const equipoUsuarios = await ctx.db.query.equipoUsuarios.findMany();
        return equipoUsuarios;  
    }),
    // get PROBAR
    get: publicProcedure
    .input(
        z.object({
            id: z.string(),
        }),
    )
    .query(async ({ ctx, input }) => {
        const equipoUsuario = await ctx.db.query.equipoUsuarios.findFirst({
            where: eq(equipoUsuarios.id, input.id),
        })
        return equipoUsuario;
    }),
    // update FUNCIONA
    update: publicProcedure
    .input(
        z.object({
            id: z.string(),
            equipo_id: z.string(),
            usuario_id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [equipoUsuario] = await ctx.db
        .update(equipoUsuarios)
        .set(input)
        .where(eq(equipoUsuarios.id, input.id))
        .returning();
        if (!equipoUsuario) {
            return null;
        }
        return equipoUsuario;
    }),
    // delete FUNCIONA
    delete: publicProcedure 
    .input(
        z.object({
            id: z.string(),
        })  
    )
    .mutation(async ({ ctx, input }) => {   
        const [equipoUsuarioEliminado] = await ctx.db
        .delete(equipoUsuarios)
        .where(eq(equipoUsuarios.id, input.id))
        .returning();
        if (!equipoUsuarioEliminado) {
            throw new Error("Error al eliminar equipo usuario");        
        }
        return equipoUsuarioEliminado; 
    })
});
