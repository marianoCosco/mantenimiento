import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { ordenesTrabajo } from "~/server/db/schema";
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
export const ordenesDeTrabajoRouter = createTRPCRouter({
        //create
    create: publicProcedure
    .input(
        z.object({
            equipoId: z.string(),
            userId: z.string(),
            title: z.string(),
            description: z.string(),
            additionarlInfo: z.string(),
            createdAt: z.date(),
            fechaProgramada: z.date(),
            fechaFinalizado: z.date(),
            estado: z.enum(["pendiente","en proceso", "completada", "cancelada"]),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const [respuesta] = await ctx.db
        .insert(ordenesTrabajo)
        .values(input)
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
        //getByTeam
        //upload
        //delete
    
    
})