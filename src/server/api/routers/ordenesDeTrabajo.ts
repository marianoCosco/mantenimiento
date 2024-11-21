import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { events, ordenesTrabajo } from "~/server/db/schema";
export const ordenesDeTrabajoRouter = createTRPCRouter({
        // Crear orden de trabajo y registrar evento
    create: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
            userId: z.string(),
            title: z.string(),
            descripcion: z.string(),
            additional_info: z.string(),
            createdAt: z.date(),
            fecha_programada: z.date(),
            fecha_finalizacion: z.date(),
            estado: z.enum(["pendiente", "en proceso", "completada", "cancelada"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [respuesta] = await ctx.db
        .insert(ordenesTrabajo)
        .values(input)
        .returning();
        if (!respuesta) {
            throw new Error("Error al crear la orden de trabajo");
        }
            // Registrar evento de creación
        
        await ctx.db.insert(events).values({
            OTId: respuesta.id,
            type: "Creación",
            description: `orden de trabajo creado: ${respuesta.title}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

    return respuesta;
    }),

        //list
    list: publicProcedure
    .query(async () => {
        const respuesta = await db.query.ordenesTrabajo.findMany({
            with: {
                equipo: true,
                usuario: true
            }
        });
        
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
            where: eq(ordenesTrabajo.id, input.id),
            with: {
                equipo: true,
                usuario: true,
                intervenciones: true,
            }
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
            where: eq(ordenesTrabajo.equipo_id, input.equipo_id),
            with: {
                equipo: true,
                usuario: true,
                intervenciones: true,
            }
        })
        return respuesta
    }),
        //update FUNCIONA
    update: publicProcedure
    .input(
        z.object({
            id: z.string(),
            equipo_id: z.string(),
            userId: z.string(),
            title: z.string(),
            descripcion: z.string(),
            additional_info: z.string(),
            createdAt: z.date(),
            fecha_programada: z.date(),
            fecha_finalizacion: z.date(),
            estado: z.enum(["pendiente", "en proceso", "completada", "cancelada"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
            // Obtener el estado actual de la orden de trabajo
        const ordenExistente = await ctx.db.query.ordenesTrabajo.findFirst({
            where: eq(ordenesTrabajo.id, input.id),
        });
        if (!ordenExistente) {
            throw new Error("Orden de trabajo no encontrada");
        }
            // Actualizar la orden de trabajo
        const [ordenActualizada] = await ctx.db
            .update(ordenesTrabajo)
            .set({
                equipo_id: input.equipo_id,
                userId: input.userId,
                title: input.title,
                descripcion: input.descripcion,
                additional_info: input.additional_info,
                createdAt: input.createdAt,
                fecha_programada: input.fecha_programada,
                fecha_finalizacion: input.fecha_finalizacion,
                estado: input.estado,
            })
            .where(eq(ordenesTrabajo.id, input.id))
            .returning();
        if (!ordenActualizada) {
            throw new Error("Error al actualizar la orden de trabajo");
        }
            // Registrar evento de actualización
            if(ordenActualizada.estado === "cancelada"){
                await ctx.db.insert(events).values({
                    OTId: ordenExistente.id,
                    type: "Cancelada",
                    description: `Orden de trabajo cancelad11111: ${ordenExistente.title}`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            }
            if(ordenActualizada.estado === "completada"){
                await ctx.db.insert(events).values({
                    OTId: ordenExistente.id,
                    type: "Completado",
                    description: `Orden de trabajo completado11111: ${ordenExistente.title}`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            }
        return ordenActualizada;
    }),

        //delete FUNCIONA
    delete: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const ordenExistente = await ctx.db.query.ordenesTrabajo.findFirst({
            where: eq(ordenesTrabajo.id, input.id),
        });

        if (!ordenExistente) {
            throw new Error("Orden de trabajo no encontrada");
        }

        const deleteOrden = await ctx.db
        .delete(ordenesTrabajo)
        .where(eq(ordenesTrabajo.id, input.id))
        if (!deleteOrden) {
            throw new Error("Error al borrar orden");
        }
        await ctx.db.insert(events).values({
            OTId: ordenExistente.id,
            type: "Eliminación",
            description: `Orden de trabajo eliminada: ${ordenExistente.title}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return deleteOrden;
    }),
    
})