

import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { ESTADOS_DISPONIBLES } from "@/app/data/facturas";

export type Estados = typeof ESTADOS_DISPONIBLES[number]["id"];

const estados = ESTADOS_DISPONIBLES.map(( { id }) => id) as Array<Estados>

export const estadoEnum = pgEnum('estados', estados as [Estados, ... Array<Estados>])

export const Facturas = pgTable('facturas', {
    id: serial('id').primaryKey().notNull(),
    creadoTs: timestamp('creadoTs').defaultNow().notNull(),
    valor: integer('valor').notNull(),
    descripcion: text('descripcion').notNull(),
    userId: text('userId').notNull(),
    estados: estadoEnum('estados').notNull()
    
   
})
