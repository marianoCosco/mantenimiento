import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { ordenesTrabajo } from "~/server/db/schema";
import { updatedAt } from "~/server/db/schema/utils";
import { nanoid } from "nanoid";
import { get } from "http";
/*
create 
list 
get
getByTeam
upload
delete
*/
export const ordenesDeTrabajoRouter = createTRPCRouter({
        //create
    create: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
            user_id: z.string(),
            title: z.string(),
            description: z.string(),
            additionarl_info: z.string(),
            createdAt: z.date(),
            fecha_programada: z.date(),
            fecha_finalizado: z.date(),
            estado: z.enum(["pendiente","en proceso", "completada", "cancelada"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [respuesta] = await ctx.db
        .insert(ordenesTrabajo)
        .values({
            equipo_id: input.equipo_id,
            userId: input.user_id,
            title: input.title,
            description: input.description,
            additional_info: input.additionarl_info,
            createdAt: input.createdAt,
            fecha_programada: input.fecha_programada,
            fecha_finalizado: input.fecha_finalizado,
            estado: input.estado
        })
        .returning();
        if (!respuesta) {
            throw new Error("Error al crear equipo");
        }    
        return respuesta; 
    }),
        //list
    list: publicProcedure
    .query(async () => {
        const respuesta = await db.query.ordenesTrabajo.findMany();
        
        return respuesta;
    }),
        //get
    get: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .query(async ({ input }) => {
        const respuesta = await db.query.ordenesTrabajo.findFirst({
            where: eq(ordenesTrabajo.id, input.id)
        })
        return respuesta
    }),
        //getByTeam
    getByTeam: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
        })
    )
    .query(async ({ input }) => {
        const respuesta = await db.query.ordenesTrabajo.findMany({
            where: eq(ordenesTrabajo.equipo_id, input.equipo_id)
        })
        return respuesta
    }),
        //upload
    upload: publicProcedure
    .input(
        z.object({
            id: z.string(),
            equipo_id: z.string(),
            user_id: z.string(),
            title: z.string(),
            description: z.string(),
            additionarl_info: z.string(),
            createdAt: z.date(),
            fecha_programada: z.date(),
            fecha_finalizado: z.date(),
            estado: z.enum(["pendiente","en proceso", "completada", "cancelada"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [ordenActualizada] = await ctx.db
        .update(ordenesTrabajo)
        .set({
            id: input.id,
            equipo_id: input.equipo_id,
            userId: input.user_id,
            title: input.title,
            descripcion: input.description,
            additional_info: input.additionarl_info,
            createdAt: input.createdAt,
            fecha_programada: input.fecha_programada,
            fecha_finalizacion: input.fecha_finalizado,
            estado: input.estado
        })
        .where(eq(ordenesTrabajo.id, input.id))
        .returning();
        if (!ordenActualizada) {
            throw new Error("Error al actualizar orden");
        }
        return ordenActualizada;
    }),
        //delete
    delete: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const deleteOrden = await ctx.db
        .delete(ordenesTrabajo)
        .where(eq(ordenesTrabajo.id, input.id))
        if (!deleteOrden) {
            throw new Error("Error al borrar orden");
        }
        return { success: true, message: "orden eliminada correctamente" };
    }),
    
    
})