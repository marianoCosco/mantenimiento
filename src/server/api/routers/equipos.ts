import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { equipos } from "~/server/db/schema";
/*
create FUNCIONA
list FUNCIONA
get PROBAR
upload (se llama update) FUNCIONA
delete FUNCIONA
*/
export const equiposRouter = createTRPCRouter({
  // create FUNCIONA
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        qr_code: z.string(),
        state: z.string(),
        last_work:z.date(),
        numberId: z.number(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [respuesta] = await ctx.db
        .insert(equipos)
        .values(input)
        .returning();

      if (!respuesta) {
        throw new Error("Error al crear equipo");
      }

      return respuesta; 
    }),
      // get PROBAR
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const equipo = await ctx.db.query.equipos.findFirst({
        where: eq(equipos.id, input.id),
      });

      if (!equipo) {
        throw new Error("equipo no encontrado");
      }

      return equipo;
    }),
    //  list FUNCIONA
  list: publicProcedure.query(async ({ ctx }) => {
    const equipos = await ctx.db.query.equipos.findMany();
    return equipos;
  }),
    // update FUNCIONA
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        qr_code: z.string(),
        state: z.string(),
        last_work:z.date(),
        numberId: z.number(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [updatedequipo] = await ctx.db
        .update(equipos)
        .set({
          id: input.id,
          name: input.name,
          qr_code: input.qr_code,
          state: input.state,
          last_work: input.last_work,
          numberId: input.numberId,
          description: input.description,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        })
        .where(eq(equipos.id, input.id))
        .returning();

      if (!updatedequipo) {
        throw new Error("Error al actualizar el equipo");
      }

      return updatedequipo;
    }),
      // delete FUNCIONA
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const deletedequipo = await ctx.db
        .delete(equipos)
        .where(eq(equipos.id, input.id))

      if (!deletedequipo) {
        throw new Error("Error al eliminar el equipo");
      }

      return { success: true, message: "equipo eliminado correctamente" };
    }),
});
