
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { events } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const eventsRouter = createTRPCRouter({
    // create FUNCIONA
create: publicProcedure 
.input(
    z.object({
        EquipoId: z.string(),
        ReporteId: z.string(),
        OTId: z.string(),
        intervencionId: z.string(),
        type: z.string(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
    })
)
.mutation(async ({ ctx, input }) => {
    const [event] = await ctx.db
    .insert(events)
    .values(input)
    .returning();
    if (!event) {
        throw new Error("Error al crear el evento");
    }
    return event
}),
    // list FUNCIONA
list: publicProcedure
.query(async ({ ctx }) => {
const eventsList  = await ctx.db.query.events.findMany({
    orderBy: desc(events.createdAt) 
})
return eventsList 
}),
    //get PROBAR
get: publicProcedure
.input(
    z.object({
        id: z.string(),
    })
)
.query(async ({ ctx, input }) => {
    const event = await ctx.db.query.events.findFirst({
        where: eq(events.id, input.id)
    })
    return event
})
})