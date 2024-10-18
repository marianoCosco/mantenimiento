import { equiposRouter } from "~/server/api/routers/equipos";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { eventsRouter } from "./routers/events";
import { imageRouter } from "./routers/images";
import { ordenesDeTrabajoRouter } from "./routers/ordenesDeTrabajo";
import { reportesRouter } from "./routers/reportes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  equipos: equiposRouter,
  events: eventsRouter,
  images: imageRouter,
  ordenesDeTrabajo: ordenesDeTrabajoRouter,
  reportes: reportesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
