import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { equipos } from "~/server/db/schema";
import { updatedAt } from "~/server/db/schema/utils";
import { nanoid } from "nanoid";
/*
create
list
get
upload
delete
*/
export const equiposRouter = createTRPCRouter({
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
        .values({
          id: nanoid(),
          name: input.name,
          qr_code: input.qr_code,
          state: input.state,
          last_work: input.last_work,
          numberId: input.numberId,
          description: input.description,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
        })
        .returning();

      if (!respuesta) {
        throw new Error("Error al crear equipo");
      }

      return respuesta; // Devolver el equipo creado
    }),

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
  //   /*
  // getByGrupoId: publicProcedure
  //   .input(
  //     z.object({
  //       grupoId: z.string(),
  //     }),
  //   )
  //   .query(async ({ input, ctx }) => {
  //     const equipo = await ctx.db.query.equipos.findMany({
  //       where: eq(equipos?.grupoid, input.grupoId),
  //     });

  //     return equipo;
  //   }),
  //   */
  list: publicProcedure.query(async ({ ctx }) => {
    const equipos = await ctx.db.query.equipos.findMany();
    return equipos;
  }),

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
        .returning();

      if (!deletedequipo) {
        throw new Error("Error al eliminar el equipo");
      }

      return { success: true, message: "equipo eliminado correctamente" };
    }),
});
