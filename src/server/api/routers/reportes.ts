import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { equipos, reportes } from "~/server/db/schema";
import { updatedAt } from "~/server/db/schema/utils";
import { nanoid } from "nanoid";
/*
create
list
get
getByTeam
upload
delete
*/
export const reportesRouter = createTRPCRouter({
        //create
    create: publicProcedure
    .input(
        z.object({
            equipo_id: z.string(),
            user_id: z.string(),
            tipo_reporte: z.enum(["intervencion realizada","estado del equipo"]),
            description: z.string(),
            createdAt: z.date(),
            periodo: z.enum(["semanal","mensual","anual"]),
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
        return reporte;
    }),
        //list
    list: publicProcedure
    .query(async () => {
        const reportes = await db.query.reportes.findMany()

        return reportes
    }),
        //get
    get: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .query(async({input}) => {
        const reporte = await db.query.reportes.findFirst({
            where:eq(reportes?.id, input.id),
            with: { equipos: true, usuarios: true },
        }) 
        return reporte
    }),
        //getByTeam
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
        //upload
    upload: publicProcedure
    .input(
        z.object({
            id: z.string(),
            equipoId: z.string(),
            userId: z.string(),
            tipoReporte: z.enum(["intervencion realizada","estado del equipo"]),
            description: z.string(),
            createdAt: z.date(),
            periodo: z.enum(["semanal","mensual","anual"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [reporteActualizado] = await ctx.db
        .update(reportes)
        .set({
            id: input.id,
            equipo_id: input.equipoId,
            userId: input.userId,
            tipo_reporte: input.tipoReporte,
            descripcion: input.description,
            createdAt: input.createdAt,
            periodo: input.periodo,
    })
        .where(eq(reportes?.id, input.id))
        .returning();
        if (!reporteActualizado) {
            throw new Error("Error al actualizar reporte");
        }
        return reporteActualizado;
    }),
        //delete
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