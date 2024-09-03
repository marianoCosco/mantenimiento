// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { Table, relations, sql } from "drizzle-orm";

import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `qr-code_${name}`);

export const equipos = createTable(
  "equipos",
  {
    id: text("id", { mode: "text" })
      .primaryKey()
      .default(sql`(lower(hex(randomblob(16))))`),
    name: text("name", { length: 256 }),
    qr_code: text("qr_code"),
    state: text("state"),
    last_work: int("last_work", { mode: "timestamp" }),
    numberId: int("numberId"),
    description: text("description"),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const eventos = createTable("eventos", {
  id: text("id", { mode: "text" }).primaryKey(),
  userId: text("userId").notNull(),
  EquipoId: text("EquipoId")
    .references(() => equipos.id)
    .notNull(),
  // ReporteId: text("ReporteId")
  //   .references(() => reporte.id)
  //   .notNull(),
  // OTId: integer("OTId")
  //   .references(() => eventos.id)
  //   .notNull(),
  // intervencionId: integer("intervencionId")
  //   .references(() => eventos.id)
  //   .notNull(),
  type: text("type", { length: 256 }),
  description: text("description"),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const eventosRelations = relations(eventos, ({ one, many }) => ({
  equipos: one(equipos, {
    fields: [eventos.EquipoId],
    references: [equipos.id],
  }),
}));
