

import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const estadoEnum = pgEnum('estados', ['no pagada', 'pagada','nula','incobrable'])

export const Facturas = pgTable('facturas', {
    id: serial('id').primaryKey().notNull(),
    creadoTs: timestamp('creadoTs').defaultNow().notNull(),
    valor: integer('valor').notNull(),
    descripcion: text('descripcion').notNull(),
    userId: text('userId').notNull(),
    estados: estadoEnum('estados').notNull()
    
   
})
