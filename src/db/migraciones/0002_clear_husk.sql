ALTER TABLE "facturas" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "facturas" DROP COLUMN IF EXISTS "usuarioId";