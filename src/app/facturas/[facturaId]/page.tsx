import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { db } from "@/db";

import { Facturas } from "@/db/schema";
import { cn } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";


  

export default async function FacturaPage({ params }: {params: { facturaId:string; }}) {

  const { userId } = await auth();
  if (!userId) return;

  const facturaId = parseInt(params.facturaId);

  if ( isNaN(facturaId)) {
    throw new Error('iNVÁLIDA ID FACTURA')
  }

  const [resultado] = await db.select()
    .from(Facturas)
    .where(
    and(eq(Facturas.id, facturaId),
        eq(Facturas.userId, userId)
    )
    )
    .limit(1)

  if ( !resultado) {
    notFound();
  }

    //console.log('resultado', resultado);

    //resultado.estados = 'no pagada'
    
  return (
    
      <main className="h-full max-w-5xl mx-auto my-12" >
        <div className="flex justify-between mb-8">
            <h1 className="flex items-center gap-4 text-3xl font-semibold">
              Facturas {facturaId}
              <Badge className={cn(
                "rounded-full capitalize",
                resultado.estados === 'no pagada' && 'bg-green-500',
                resultado.estados === 'pagada' && 'bg-green-600',
                resultado.estados === 'nula' && 'bg-zinc-700',
                resultado.estados === 'incobrable' && 'bg-red-600'
                )}>
                {resultado.estados}
              </Badge>
            </h1> 
            <p>

            </p>            
        </div>
        <p className="text-3xl mb-3">
          ${ (resultado.valor / 100 ).toFixed(2) }
        </p>
        <p className="text-lg mb-8">
          { resultado.descripcion }
        </p>   
        <h2 className="font-bold text-lg mb-4">Detalles de Factura</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              N° Factura
            </strong>
            <span>
            {resultado.id}
            </span>

          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Fecha 
            </strong>
            <span>
                { new Date(resultado.creadoTs).toLocaleDateString()}
            </span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Nombre Cliente
            </strong>
            <span>

            </span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Email
            </strong>
            <span>

            </span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">

            </strong><span>

            </span>
          </li>
        </ul>    
      </main>      
    
  );
}
