import { defineConfig } from "drizzle-kit";
import 'dotenv/config'

require('dotenv').config({
    path: './.env.local'
})
if ( typeof process.env.XATA_DATABASE_URL !== 'string') {
    throw new Error('Por favor coloca tu XATA_DATABASE_URL');
}

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/db/schema.ts',
  out: './src/db/migracion',
  dbCredentials:{
    url: String(process.env.XATA_DATABASE_URL)
  }
});
