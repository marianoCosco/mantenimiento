// routers/equiposRouter.ts

import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { equipos, equipoUsuarios, events, images, ordenesTrabajo, reportes } from "~/server/db/schema";

export const equiposRouter = createTRPCRouter({
  // Crear equipo y registrar evento
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        qr_code: z.string(),
        state: z.string(),
        last_work: z.date(),
        numberId: z.number(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [respuesta] = await ctx.db.insert(equipos).values(input).returning();

      if (!respuesta) {
        throw new Error("Error al crear equipo");
      }
      await ctx.db.insert(events).values({
        EquipoId: respuesta.id,
        type: "Creación",
        description: `Equipo creado: ${respuesta.name}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return respuesta;
    }),

  // Obtener equipo por ID
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const equipo = await ctx.db.query.equipos.findFirst({
        where: eq(equipos.id, input.id),
      });

      if (!equipo) {
        throw new Error("Equipo no encontrado");
      }

      return equipo;
    }),

  // Listar equipos
  list: publicProcedure.query(async ({ ctx }) => {
    const equiposList = await ctx.db.query.equipos.findMany();
    return equiposList;
  }),

  // Actualizar equipo y registrar evento
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
      await ctx.db.insert(events).values({
        EquipoId: updatedequipo.id,
        type: "Actualización",
        description: `Equipo actualizado: ${updatedequipo.name}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return updatedequipo;
    }),

  // Eliminar equipo y registrar evento
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      
    // Eliminar imágenes relacionadas
    await ctx.db.delete(images)
    .where(eq(images.equipo_id, input.id))
    .returning();

  // Eliminar órdenes de trabajo relacionadas
  await ctx.db.delete(ordenesTrabajo)
    .where(eq(ordenesTrabajo.equipo_id, input.id))
    .returning();

  // Eliminar reportes relacionados
  await ctx.db.delete(reportes)
    .where(eq(reportes.equipo_id, input.id))
    .returning();

  // Eliminar usuarios relacionados
  await ctx.db.delete(equipoUsuarios)
    .where(eq(equipoUsuarios.equipo_id, input.id))
    .returning();

  // Eliminar equipo
  const equipo = await ctx.db.delete(equipos)
    .where(eq(equipos.id, input.id))
    .returning();

  // Insertar evento de eliminación
  await ctx.db.insert(events).values({
    EquipoId: equipo[0]?.id,
    type: "Eliminación",
    description: `Equipo eliminado: ${equipo[0]?.name}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

      return { success: true, message: "Equipo eliminado correctamente" };
    }),
});