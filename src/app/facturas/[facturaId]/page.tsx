import { notFound } from "next/navigation";
import { db } from "@/db";
import { Facturas } from "@/db/schema";

import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import Factura from "./Factura";


export default async function FacturaPage( {
  params,
}: {
  params: Promise< { facturaId: number }>
}) {

  const { userId } = await auth();
  if (!userId) return; 

  const {facturaId}  = await params;
 
  /* if (isNaN(facturaId)) {
    throw new Error('iNVÁLIDA ID FACTURA')
  } */

  const [resultado] = await db.select()
    .from(Facturas)
    .where(
      and(eq(Facturas.id, facturaId),
        eq(Facturas.userId, userId)
      )
    )
    .limit(1)

  if (!resultado) {
    notFound();
  }
  //console.log('resultado', resultado);

  //resultado.estados = 'no pagada'

  return <Factura factura={resultado} />;

}
