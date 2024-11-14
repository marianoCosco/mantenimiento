import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { events, reportes } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const reportesRouter = createTRPCRouter({
        // Crear reporte y registrar evento
    create: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
            userId: z.string(),
            tipo_reporte: z.enum(["intervencion realizada", "estado del equipo"]),
            descripcion: z.string(),
            createdAt: z.date(),
            periodo: z.enum(["semanal", "mensual", "anual"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [reporte] = await ctx.db
            .insert(reportes)
            .values(input)
            .returning();
        if (!reporte) {
            throw new Error("Error al crear reporte");
        }

        await ctx.db.insert(events).values({
            ReporteId: reporte.id,
            type: "Creacion",
            description: `reporte creado: ${reporte.id}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return reporte;
    }),
        //list FUNCIONA
    list: publicProcedure
    .query(async ({ctx}) => {
        const listReportes = await ctx.db.query.reportes.findMany({
            orderBy: desc(reportes.createdAt),
            with: {
                equipo: true,
                usuario: true
            }
        })

        return listReportes
    }),
        //get PROBAR
    get: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .query(async({input, ctx}) => {
        const reporte = await ctx.db.query.reportes.findFirst({
            where:eq(reportes.id, input.id),
            with: { 
                equipo: true,
                usuario: true },
        }) 
        if (!reporte) {
            throw new Error("reporte no encontrado")
        } 
        return reporte;
    }),
        //getByTeam PROBAR
    getByTeam: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
        })
    )
    .query(async ({input}) => {
        const reporte = await db.query.reportes.findMany({
            where:eq(reportes?.equipo_id, input.equipo_id)
        })
        return reporte
    }),
        // Actualizar reporte y registrar evento de actualización
    upload: publicProcedure
    .input(
        z.object({
        id: z.string(),
        equipo_id: z.string(),
        userId: z.string(),
        tipo_reporte: z.enum(["intervencion realizada", "estado del equipo"]),
        descripcion: z.string(),
        createdAt: z.date(),
        periodo: z.enum(["semanal", "mensual", "anual"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [reporteActualizado] = await ctx.db
        .update(reportes)
        .set({
            equipo_id: input.equipo_id,
            userId: input.userId,
            tipo_reporte: input.tipo_reporte,
            descripcion: input.descripcion,
            createdAt: input.createdAt,
            periodo: input.periodo,
        })
        .where(eq(reportes?.id, input.id))
        .returning();
        if (!reporteActualizado) {
            throw new Error("Error al actualizar reporte");
        }
        
        await ctx.db.insert(events).values({
            ReporteId: reporteActualizado.id,
            type: "actualizado",
            description: `reporte actualizado: ${reporteActualizado.id}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return reporteActualizado;
    }),
        //delete FUNCIONA
    delete: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const deleteReporte = await ctx.db
        .delete(reportes)
        .where(eq(reportes?.id, input.id))

        if (!deleteReporte) {
            throw new Error("Error al borrar reporte");
        }
        return { success: true, message: "reporte eliminado correctamente" };
    }),
})