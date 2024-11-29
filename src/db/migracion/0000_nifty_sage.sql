CREATE TYPE "public"."estados" AS ENUM('no pagada', 'pagada', 'nula', 'incobrable');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"creadoTs" timestamp DEFAULT now() NOT NULL,
	"nombre" text NOT NULL,
	"email" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facturas" (
	"id" serial PRIMARY KEY NOT NULL,
	"creadoTs" timestamp DEFAULT now() NOT NULL,
	"valor" integer NOT NULL,
	"descripcion" text NOT NULL,
	"userId" text NOT NULL,
	"clienteId" integer NOT NULL,
	"estados" "estados" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facturas" ADD CONSTRAINT "facturas_clienteId_clientes_id_fk" FOREIGN KEY ("clienteId") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
