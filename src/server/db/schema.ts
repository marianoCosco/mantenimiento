import { sqliteTableCreator, index, int, text, real } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `Tienda_${name}`);

// Tabla Categorías
export const categorias = createTable(
  "categorias",
  {
    id: int("id").primaryKey().notNull(),
    nombre: text("nombre", { length: 128 }).notNull(),
  },
  (example) => ({
    nombreIndex: index("nombre_idx").on(example.nombre),
  }),
);

// Tabla Subcategorías
export const subcategorias = createTable(
  "subcategorias",
  {
    id: int("id").primaryKey().notNull(),
    categoria_id: int("categoria_id").notNull(),
    nombre: text("nombre", { length: 128 }).notNull(),
  },
  (example) => ({
    nombreIndex: index("subcategoria_nombre_idx").on(example.nombre),
  }),
);

// Tabla Prendas
export const prendas = createTable(
  "prendas",
  {
    id: int("id").primaryKey().notNull(),
    categoria_id: int("categoria_id").notNull(),
    subcategoria_id: int("subcategoria_id").notNull(),
    nombre: text("nombre", { length: 128 }).notNull(),
    precio: int("precio").notNull(),
    fecha_ingreso: int("fecha_ingreso", { mode: "timestamp" }).notNull(),
    es_carrusel: text("es_carrusel").notNull(),
  },
  (example) => ({
    nombreIndex: index("prenda_nombre_idx").on(example.nombre),
  }),
);

// Tabla Imágenes
export const imagenes = createTable(
  "imagenes",
  {
    id: int("id").primaryKey().notNull(),
    url: text("url", { length: 512 }).notNull(),
    prenda_id: int("prenda_id").notNull(),
  }
);

// Tabla Ofertas
export const ofertas = createTable(
  "ofertas",
  {
    id: int("id").primaryKey().notNull(),
    fecha_inicio: int("fecha_inicio", { mode: "timestamp" }).notNull(),
    fecha_fin: int("fecha_fin", { mode: "timestamp" }).notNull(),
    porcentaje: real("porcentaje").notNull(),
    prenda_id: int("prenda_id").notNull(),
  }
);

// Tabla Facturas
export const facturas = createTable(
  "facturas",
  {
    id: int("id").primaryKey().notNull(),
    cliente_id: int("cliente_id").notNull(),
    fecha: int("fecha", { mode: "timestamp" }).notNull(),
    total: int("total").notNull(),
  }
);

// Tabla ItemFactura
export const itemFactura = createTable(
  "item_factura",
  {
    id: int("id").primaryKey().notNull(),
    factura_id: int("factura_id").notNull(),
    prenda_id: int("prenda_id").notNull(),
    cantidad: int("cantidad").notNull(),
    precio: real("precio").notNull(),
  }
);

// Tabla Clientes
export const clientes = createTable(
  "clientes",
  {
    id: int("id").primaryKey().notNull(),
    nombre: text("nombre", { length: 128 }).notNull(),
    direccion: text("direccion", { length: 256 }).notNull(),
    telefono: text("telefono", { length: 15 }).notNull(),
    ultimaCompra: int("ultima_compra").notNull(),
    bonus: real("bonus").notNull(),
  },
  (example) => ({
    nombreIndex: index("cliente_nombre_idx").on(example.nombre),
  }),
);
