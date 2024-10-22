import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { events } from "~/server/db/schema";
import { updatedAt } from "~/server/db/schema/utils";
import { nanoid } from "nanoid";
import { report } from "process";

/*
create
get
*/
export const eventsRouter = createTRPCRouter({
    // create
create: publicProcedure 
.input(
    z.object({
        equipoId: z.string(),
        reportId: z.string(),
        otid: z.string(),
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
    // get
get: publicProcedure
.query(async ({ ctx }) => {
    const events = await ctx.db.query.events.findMany()
    return events
})



})