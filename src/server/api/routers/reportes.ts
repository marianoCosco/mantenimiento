import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { reportes } from "~/server/db/schema";
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
            id: z.string(),
            equipoId: z.string(),
            userId: z.string(),
            tipoReporte: z.string(),
            description: z.string(),
            createdAt: z.date(),
            periodo: z.string(),
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
        //get
        //getByTeam
        //upload
        //delete
})