"use client";
import { ChevronDown, Ellipsis, Trash2 } from "lucide-react";
import { Facturas } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import Contenedor from "@/components/Container";
import { cn } from "@/lib/utils";


import { DropdownMenu,
         DropdownMenuContent,
         DropdownMenuItem,
         DropdownMenuTrigger }
         from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { ESTADOS_DISPONIBLES } from "@/app/data/facturas";
import { actualizarAccionEstados, eliminarFactura } from "../../../../acciones";
import { useOptimistic } from "react";
  
interface FacturaProps {
    factura: typeof Facturas.$inferSelect
}
 

    //console.log('resultado', resultado);

    //resultado.estados = 'no pagada'
export default function Factura({ factura }: FacturaProps) {

    
  const [currentEstado, setCurrentEstado] = useOptimistic(
    factura.estados,
    (estado, nuevoEstado) => {
        return String(nuevoEstado);
    }
  )

  async function manejoActualizarEstado(formData: FormData) {

    const originalEstados = currentEstado;
    setCurrentEstado(formData.get('estados'))
    try {
        
        await actualizarAccionEstados(formData);
    } catch (e) {
        setCurrentEstado(originalEstados)
    }
    
  }

 
  

  return (
    
      <main className="w-full h-full">
        <Contenedor>
        <div className="flex justify-between mb-8">
            <h1 className="flex items-center gap-4 text-3xl font-semibold">
              Facturas { factura.id }
              <Badge className={cn(
                "rounded-full capitalize",
                currentEstado === 'no pagada' && 'bg-green-500',
                currentEstado === 'pagada' && 'bg-green-600',
                currentEstado === 'nula' && 'bg-zinc-700',
                currentEstado=== 'incobrable' && 'bg-red-600'
                )}>
                {currentEstado}
              </Badge>
            </h1>
            <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant='outline'>
                  
                    Cambiar Estado
                  <ChevronDown className="w-4 h-auto" />
              </Button>  
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {ESTADOS_DISPONIBLES.map(estados => {
                  return (
                    <DropdownMenuItem key={estados.id}>
                      <form action={manejoActualizarEstado}>
                        <input type="hidden" name="id" value={factura.id} />
                        <input type="hidden" name="estados" value={estados.id} />
                        <button>{estados.label}</button>
                      </form>
                      
                    </DropdownMenuItem>
                  )
                })}
                {/* <DropdownMenuLabel>Estado</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2" variant='outline'>
                    <span className="sr-only">Más Opciones</span>
                    <Ellipsis className="w-4 h-auto" />
                      
                </Button>  
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-1">
                        <Trash2 className="w-4 h-auto" />
                        Eliminar factura
                      </button>
                    </DialogTrigger>
                 
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                      Eliminar Factura?
                  </DialogTitle>
                  <DialogDescription>
                    deseas eli
                  </DialogDescription>
                  <DialogFooter>
                  <form className="flex justify-center" action={eliminarFactura}>
                      <input type="hidden" name="id" value={factura.id} />
                        <Button variant="destructive" className="flex items-center gap-2">
                          <Trash2 className="w-4 h-auto" />
                          Eliminar factura
                        </Button>
                    </form>
                  </DialogFooter>
                 
                </DialogHeader>
              </DialogContent>
            </Dialog>


            
          </div>          
        </div>
        <p className="text-3xl mb-3">
          ${ (factura.valor / 100 ).toFixed(2) }
        </p>
        <p className="text-lg mb-8">
          { factura.descripcion }
        </p>   
        <h2 className="font-bold text-lg mb-4">Detalles de Factura</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              N° Factura
            </strong>
            <span>
            {factura.id}
            </span>

          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Fecha 
            </strong>
            <span>
                { new Date(factura.creadoTs).toLocaleDateString()}
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
        </Contenedor>    
      </main>      
    
  );
}
