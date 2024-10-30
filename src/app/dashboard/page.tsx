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

  

export default function Home() {
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
                      <TableHead className="p-4">Estado</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                      <TableCell className="font-medium text-left">
                        <span className="font-semibold">
                        30/10/2024
                        </span>
                      </TableCell>
                      <TableCell className="text-left">
                        <span className="font-semibold">
                        Omar Schmidt K.
                        </span>
                      </TableCell>
                      <TableCell className="text-left">
                        <span className="">
                        omar.sk80@gmail.com
                        </span>
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge className="rounded-full">Activo</Badge>                        
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold">
                        $250.000
                        </span>
                      </TableCell>
                  </TableRow>
              </TableBody>
          </Table>

        
      </main>      
    
  );
}
