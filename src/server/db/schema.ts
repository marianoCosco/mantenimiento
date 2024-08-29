// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { Table, relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  json,
  real,
  primaryKey,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";
import { columnId, createdAt, pgTable, updatedAt } from "./schema/utils";

export const equipos = pgTable(
  "equipos",
  {
    id: columnId,
    name: varchar("name", { length: 256 }),
    qr_code: varchar("qr_code"),
    state: varchar("state"),
    last_work: varchar("last_work"),
    numberId: integer("numberId"),
    description: varchar("description"),
    updatedAt: updatedAt,
    createdAt: createdAt,
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
