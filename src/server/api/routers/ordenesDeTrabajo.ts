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
                usuario: true}
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
            // Registrar eventos en función del cambio de estado
        if (ordenExistente.estado !== input.estado) {
            console.log("registro automot")
            let tipoEvento: string | null = null;
            let descripcionEvento: string | null = null;
            switch (input.estado) {
                case "cancelada":
                    tipoEvento = "Cancelación";
                    descripcionEvento = `Orden de trabajo cancelada: ${ordenActualizada.title}`;
                    break;
                case "completada":
                    tipoEvento = "Finalización";
                    descripcionEvento = `Orden de trabajo completada: ${ordenActualizada.title}`;
                    break;
                case "en proceso":
                    tipoEvento = "Inicio";
                    descripcionEvento = `Orden de trabajo iniciada: ${ordenActualizada.title}`;
                    break;
                case "pendiente":
                    tipoEvento = "Revisión";
                    descripcionEvento = `Orden de trabajo marcada como pendiente: ${ordenActualizada.title}`;
                    break;
            }
            if (tipoEvento && descripcionEvento) {
                console.log("registro moto")
                await ctx.db.insert(events).values({
                    OTId: ordenActualizada.id,
                    type: tipoEvento,
                    description: descripcionEvento,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            };
        return ordenActualizada;
    }}),

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