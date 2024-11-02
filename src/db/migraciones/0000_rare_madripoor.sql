CREATE TYPE "public"."estados" AS ENUM('no pagada', 'pagada', 'nula', 'incobrable');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facturas" (
	"id" serial PRIMARY KEY NOT NULL,
	"creadoTs" timestamp DEFAULT now() NOT NULL,
	"valor" integer NOT NULL,
	"descripcion" text NOT NULL,
	"estados" "estados" NOT NULL
);
