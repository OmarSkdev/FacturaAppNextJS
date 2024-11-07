import { db } from "@/db";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import Link from "next/link";
import { CirclePlus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Facturas } from "@/db/schema";
import { cn } from "@/lib/utils";

  

export default async function Home() {

  const resultados = await db.select().from(Facturas);
    console.log(resultados);

  return (
    
      <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12" >
        <div className="flex justify-between">
            <h1 className="text-3xl font-semibold">Facturas</h1> 
            <p>
                <Button className="inline-flex gap-2" variant="ghost" asChild>
                    <Link href="/facturas/nueva">
                    <CirclePlus className="h-4 w-4" />
                    Crear Factura
                    </Link>
                </Button>
            </p> 
        </div>
        

          <Table>
              <TableCaption>Lista de recientes invoices.</TableCaption>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px] p-4">Fecha</TableHead>
                      <TableHead className="p-4">Cliente</TableHead>
                      <TableHead className="p-4">Email</TableHead>
                      <TableHead className="text-center p-4">Estado</TableHead>
                      <TableHead className="text-right p-4">Valor</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {resultados.map(resultado => {
                  return (
                  <TableRow key={resultado.id}>
                      <TableCell className="font-medium text-left p-0">
                        <Link href={`/facturas/${resultado.id}`} className="block p-4 font-semibold">
                        { new Date(resultado.creadoTs).toLocaleDateString()}
                        </Link>
                      </TableCell>
                      <TableCell className="text-left p-0">
                        <Link href={`/facturas/${resultado.id}`} className="p-4 block font-semibold">
                          Omar Schmidt K.
                        </Link>
                      </TableCell>
                      <TableCell className="text-left p-0">
                        <Link href={`/facturas/${resultado.id}`} className="block p-4 ">
                          omar.sk80@mail.com
                        </Link>
                      </TableCell>
                      <TableCell className="text-center p-0">
                        <Link className="block p-4" href={`/facturas/${resultado.id}`} >
                          <Badge className={cn(
                            "rounded-full capitalize",
                            resultado.estados === 'no pagada' && 'bg-green-500',
                            resultado.estados === 'pagada' && 'bg-green-600',
                            resultado.estados === 'nula' && 'bg-zinc-700',
                            resultado.estados === 'incobrable' && 'bg-red-600'
                          )}>
                            {resultado.estados}
                          </Badge>
                        </Link>                        
                      </TableCell>
                      <TableCell className="text-right p-0">
                        
                        <Link href={`/facturas/${resultado.id}`} className="block p-4 font-semibold">
                        ${resultado.valor}
                        </Link>
                        
                      </TableCell>
                  </TableRow>
                  )}
                )}
              </TableBody>
          </Table>

        
      </main>      
    
  );
}
