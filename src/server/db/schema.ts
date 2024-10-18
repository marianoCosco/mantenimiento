// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { date, timestamp } from "drizzle-orm/mysql-core";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";



export const createTable = sqliteTableCreator((name) => `mantenimiento_${name}`);

export const equipos = createTable(
  "equipos",
  {
    id:  text("id").primaryKey(),
    name: text("name", { length: 256 }),
    qr_code: text("qr_code"),
    state: text("state"),
    last_work: int("last_work", { mode: "timestamp" }),  
    numberId: int("numberId"),
    description: text("description"),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const images = createTable(
  "images",
  {
    id: text("id").primaryKey(),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    url: text("url"),
    createdAt: int("created_at", { mode: "timestamp" }),
  }
);

export const ordenesTrabajo = createTable(
  "ordenes_trabajo",
  {
    id: text("id").primaryKey(),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    userId: text("user_id").references(() => usuarios.id),
    title: text("title"),
    descripcion: text("descripcion"),
    additional_info: text("additional_info"), 
    createdAt: int("created_at", { mode: "timestamp" }),
    fecha_programada: int("fecha_programada", { mode: "timestamp" }),
    fecha_finalizacion: int("fecha_finalizacion", { mode: "timestamp" }),
    estado: text("estado"),
  }
);

export const reportes = createTable(
  "reportes",
  {
    id: text("id").primaryKey(),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    userId: text("user_id").references(() => usuarios.id), 
    tipo_reporte: text("tipo_reporte"),
    descripcion: text("descripcion"),
    createdAt: int("created_at", { mode: "timestamp" }),
    periodo: text("periodo"),
  }
);

export const intervenciones = createTable(
  "intervenciones",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => usuarios.id),
    OTid: text("ot_id").references(() => ordenesTrabajo.id),
    title: text("title"),
    descripcion: text("descripcion"),
    createdAt: int("created_at", { mode: "timestamp" }),
  }
);

export const usuarios = createTable(
  "usuarios",
  {
    id: text("id").primaryKey(),
    nombre: text("nombre"),
    legajo: text("legajo"),
    email: text("email"),
    telefono: text("telefono"),
    createdAt: int("created_at", { mode: "timestamp" }).defaultNow(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  }
);

export const events = createTable(
  "events",
  {
    id: text("id").primaryKey(),
    EquipoId: text("equipo_id"),
    ReporteId: text("reporte_id"), 
    OTId: text("ot_id"), 
    intervencionId: text("intervencion_id"), 
    type: text("type"),
    description: text("description"),
    createdAt: int("created_at", { mode: "timestamp" }).defaultNow(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  }
);

export const equipoUsuarios = createTable(
  "equipo_usuarios",
  {
    id: text("id").primaryKey(),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    usuario_id: text("usuario_id").references(() => usuarios.id), 
  }
);

export const ordenTrabajoUsuarios = createTable(
  "orden_trabajo_usuarios",
  {
    id: text("id").primaryKey(),
    orden_trabajo_id: text("orden_trabajo_id").references(() => ordenesTrabajo.id), 
    usuario_id: text("usuario_id").references(() => usuarios.id),
  }
);

export const intervencionesUsuarios = createTable(
  "intervenciones_usuarios",
  {
    id: text("id").primaryKey(),
    intervenciones_id: text("intervenciones_id").references(() => intervenciones.id), 
    usuario_id: text("usuario_id").references(() => usuarios.id), 
  }
);