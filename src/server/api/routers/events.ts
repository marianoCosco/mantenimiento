
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { events } from "~/server/db/schema";

/*
create FUNCIONA
list FUNCIONA
get PROBAR
update FUNCIONA
delete FUNCIONA
*/
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
    const events = await ctx.db.query.events.findMany()
    return events
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
        where: eq(events.id, input.id),
    })
    return event
}),
    //update FUNCIONA
update: publicProcedure
.input(
    z.object({
        id: z.string(),
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
    const [updatedEvent] = await ctx.db
    .update(events)
    .set({
        id: input.id,
        EquipoId: input.EquipoId,
        ReporteId: input.ReporteId,
        OTId: input.OTId,
        intervencionId: input.intervencionId,
        type: input.type,
        description: input.description,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
    })
    .where(eq(events.id, input.id))
    .returning();
    if (!updatedEvent) {
        throw new Error("Error al actualizar el evento");
    }
    return updatedEvent
}),
    //delete FUNCIONA
delete: publicProcedure
.input(
    z.object({
        id: z.string(),
    })
)
.mutation(async ({ ctx, input }) => {
    const eventEliminado = await ctx.db
    .delete(events)
    .where(eq(events.id, input.id))
    .returning();
    if (!eventEliminado) {
        throw new Error("Error al eliminar el evento");
    }
    return eventEliminado
})
})