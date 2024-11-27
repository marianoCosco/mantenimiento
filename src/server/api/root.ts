import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { clientesRouter } from "~/server/api/routers/clientes";
import { categoriasRouter } from "~/server/api/routers/categorias";
import { facturasRouter } from "~/server/api/routers/facturas";
import { imagesRouter } from "~/server/api/routers/images";
import { itemFacturaRouter } from "~/server/api/routers/itemFactura";
import { ofertasRouter } from "~/server/api/routers/ofertas"; 
import { prendasRouter } from "~/server/api/routers/prendas";
import { subcategoriasRouter } from "~/server/api/routers/subcategorias";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  clientes: clientesRouter,
  categorias: categoriasRouter,
  facturas: facturasRouter,
  imagenes: imagesRouter,
  itemFactura: itemFacturaRouter,
  ofertas: ofertasRouter,
  prendas: prendasRouter,
  subcategorias: subcategoriasRouter,
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
