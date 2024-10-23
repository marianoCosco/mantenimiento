// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { date, timestamp } from "drizzle-orm/mysql-core";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";



export const createTable = sqliteTableCreator((name) => `mantenimiento_${name}`);

export const equipos = createTable(
  "equipos",
  {
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
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
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    url: text("url"),
    createdAt: int("created_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  }
);

export const ordenesTrabajo = createTable(
  "ordenes_trabajo",
  {
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    userId: text("user_id").references(() => usuarios.id),
    title: text("title"),
    descripcion: text("descripcion"),
    additional_info: text("additional_info"), 
    createdAt: int("created_at", { mode: "timestamp" }),
    fecha_programada: int("fecha_programada", { mode: "timestamp" }),
    fecha_finalizacion: int("fecha_finalizacion", { mode: "timestamp" }),
    estado: text("estado", {enum:["pendiente","en proceso", "completada", "cancelada"]}),
  }
);
// pendiente, en proceso, completada, cancelada
export const reportes = createTable(
  "reportes",
  {
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    userId: text("user_id").references(() => usuarios.id), 
    tipo_reporte: text("tipo_reporte", {enum:["intervencion realizada","estado del equipo"]}),
    descripcion: text("descripcion"),
    createdAt: int("created_at", { mode: "timestamp" }),
    periodo: text("periodo", {enum:["semanal","mensual","anual"]}),
  }
);

export const intervenciones = createTable(
  "intervenciones",
  {
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
    userId: text("user_id").references(() => usuarios.id),
    OTid: text("ot_id"),
    title: text("title"),
    descripcion: text("descripcion"),
    createdAt: int("created_at", { mode: "timestamp" }),
  }
);

export const usuarios = createTable(
  "usuarios",
  {
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
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
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
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
    id:  text("id").primaryKey().notNull().$defaultFn(()=> nanoid()),
    equipo_id: text("equipo_id").references(() => equipos.id), 
    usuario_id: text("usuario_id").references(() => usuarios.id), 
  }
);

// muchas ordenes de trabajo
export const ordenTrabajoUsuariosRelations = relations(ordenesTrabajo, ({ one }) => ({
  ordenTrabajo: one(ordenesTrabajo, {
    fields: [ordenesTrabajo.id], 
    references: [ordenesTrabajo.id],
  }),
  usuario: one(usuarios, {
    fields: [ordenesTrabajo.id],
    references: [usuarios.id],
  }),
}));

export const intervencionesUsuariosRelations = relations(intervenciones, ({ one }) => ({
  intervencion: one(intervenciones, {
    fields: [intervenciones.id], 
    references: [intervenciones.id],
  }),
  usuario: one(usuarios, {
    fields: [intervenciones.id],
    references: [usuarios.id],
  }),
}));