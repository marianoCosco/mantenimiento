import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { intervenciones } from "~/server/db/schema";
/*
create FUNCIONA
list FUNCIONA
get PROBAR
upload (se llama update) FUNCIONA
delete FUNCIONA
*/
export const intervencionesRouter = createTRPCRouter({
  // create FUNCIONA
  create: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        ot_id: z.string(),
        title: z.string(),
        descripcion: z.string(),
        created_At: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [respuesta] = await ctx.db
        .insert(intervenciones)
        .values(input)
        .returning();

      if (!respuesta) {
        throw new Error("Error al crear intervenciones");
      }

      return respuesta; 
    }),
      // get 
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const intervencion = await ctx.db.query.equipos.findFirst({
        where: eq(intervenciones.id, input.id),
      });

      if (!intervencion) {
        throw new Error("intervencion no encontrado");
      }

      return intervencion;
    }),
    //  list FUNCIONA
  list: publicProcedure.query(async ({ ctx }) => {
    const intervencion = await ctx.db.query.intervenciones.findMany();
    return intervencion;
  }),
    // update FUNCIONA
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        user_id: z.string(),
        ot_id: z.string(),
        title: z.string(),
        descripcion: z.string(),
        created_At: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [updatedIntervencion] = await ctx.db
        .update(intervenciones)
        .set({
          id: input.id,
          userId: input.user_id,
          OTid: input.ot_id,
          title: input.title,   
          descripcion: input.descripcion,
          createdAt: input.created_At,
        })
        .where(eq(intervenciones.id, input.id))
        .returning();

      if (!updatedIntervencion) {
        throw new Error("Error al actualizar el equipo");
      }

      return updatedIntervencion;
    }),
      // delete FUNCIONA
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const deletedIntervenciones = await ctx.db
        .delete(intervenciones)
        .where(eq(intervenciones.id, input.id))

      if (!deletedIntervenciones) {
        throw new Error("Error al eliminar el Intervenciones");
      }

      return { success: true, message: "Intervenciones eliminado correctamente" };
    }),
});
