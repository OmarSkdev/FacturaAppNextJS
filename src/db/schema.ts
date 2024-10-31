
import { integer, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const estadoEnum = pgEnum('estados', ['no pagada', 'pagada','nula','incobrable'])

export const Facturas = pgTable('facturas', {
    id: serial('id').primaryKey().notNull(),
    creadoTs: timestamp('creadoTs').defaultNow().notNull(),
    valor: integer('valor').notNull(),
    estados: estadoEnum('estados')
});