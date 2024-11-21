import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { intervenciones, events, ordenesTrabajo } from "~/server/db/schema";

export const intervencionesRouter = createTRPCRouter({
  // Crear intervención y registrar evento de creación
  create: publicProcedure
    .input(
      z.object({
        type: z.enum(["Finalización", "Cancelación", "Avance"]),
        userId: z.string(),
        OTid: z.string(),
        title: z.string(),
        descripcion: z.string(),
        createdAt: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [respuesta] = await ctx.db
        .insert(intervenciones)
        .values(input)
        .returning();

      if (!respuesta) {
        throw new Error("Error al crear intervención");
      }

      await ctx.db.insert(events).values({
        intervencionId: respuesta.id,
        type: "Creación",
        description: `intervencion creado: ${respuesta.title}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if(input.type === "Finalización"){
        const [ordenTrabajo] =await ctx.db.update(ordenesTrabajo).set({
          estado: "completada",
          fecha_finalizacion: new Date(),
        })
        .where(eq(ordenesTrabajo.id, input.OTid))
        .returning();

        await ctx.db.insert(events).values({
          intervencionId: respuesta.OTid,
          type: "Finalización",
          description: `orden finalizada: ${ordenTrabajo?.title}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
      if(input.type === "Cancelación"){
        const [ordenTrabajo] = await ctx.db.update(ordenesTrabajo).set({
          estado: "cancelada",
          fecha_finalizacion: new Date(),
        })
        .where(eq(ordenesTrabajo.id, input.OTid))
        .returning();
        
        await ctx.db.insert(events).values({
          intervencionId: respuesta.OTid,
          type: "Cancelación",
          description: `orden cancelada: ${ordenTrabajo?.title}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
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
        with: {
          usuario: true,
          ordenesTrabajo: true,
        }
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
        type: z.enum(["Finalización", "Cancelación", "Avance"]),
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
          type: input.type,
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
      
      await ctx.db.insert(events).values({
        intervencionId: updatedIntervencion.id,
        type: "Actualizacion",
        description: `intervencion actualizado: ${updatedIntervencion.title}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });


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
