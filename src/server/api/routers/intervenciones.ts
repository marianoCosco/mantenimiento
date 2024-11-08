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
        userId: z.string(),
        OTid: z.string(),
        title: z.string(),
        descripcion: z.string(),
        createdAt: z.date(),
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
      // get FUNCIONA
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const intervencion = await ctx.db.query.intervenciones.findFirst({
        where: eq(intervenciones.id, input.id),
      });

      if (!intervencion) {
        throw new Error("intervencion no encontrado");
      }

      return intervencion;
    }),
    //  list FUNCIONA
  list: publicProcedure.query(async ({ ctx }) => {
    const intervencion = await ctx.db.query.intervenciones.findMany({
      with: {
        usuario: true,
        ordenesTrabajo: true,
      }
    });
    return intervencion;
  }),
    // update FUNCIONA
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        OTid: z.string(),
        title: z.string(),
        descripcion: z.string(),
        createdAt: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [updatedIntervencion] = await ctx.db
        .update(intervenciones)
        .set({
          id: input.id,
          userId: input.userId,
          OTid: input.OTid,
          title: input.title,   
          descripcion: input.descripcion,
          createdAt: input.createdAt,
        })
        .where(eq(intervenciones.id, input.id))
        .returning();

      if (!updatedIntervencion) {
        throw new Error("Error al actualizar la intervencion");
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
