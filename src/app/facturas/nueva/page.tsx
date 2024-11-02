import { sql } from "drizzle-orm";
import { db } from "@/db";

import { Label } from "@/components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


import { crearAccion } from "../../../../acciones";
  

export default async function Home() {

    /* const resultados = await db.execute(sql `SELECT current_database()`)
    console.log('resultados:', resultados);
     */

    return (

        <main className="flex flex-col justify-center h-full gap-6 max-w-5xl mx-auto my-12" >
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Crear Factura</h1>

            </div>
            {/* {JSON.stringify(resultados)} */}
            <form action={crearAccion} className="grid gap-4 max-w-xs">
                <div>
                    <Label htmlFor="nombre" className="block font-semibold text-sm mb-2" >Nombre Factura</Label>
                    <Input id="nombre" name="nombre" type="text"></Input>
                </div>
                <div>
                    <Label htmlFor="email" className="block font-semibold text-sm mb-2" >Email</Label>
                    <Input id="email" name="email" type="email"></Input>
                </div>
                <div>
                    <Label htmlFor="valor" className="block font-semibold text-sm mb-2">Valor</Label>
                    <Input id="valor" name="valor" type="text"></Input>
                </div>
                <div>
                    <Label htmlFor="descripcion" className="block font-semibold text-sm mb-2">Descripción</Label>
                    <Textarea id="descripcion" name="descripcion"></Textarea>
                </div>
                <div>
                    <Button className="w-full font-semibold">
                        Enviar
                    </Button>
                </div>
            </form>




        </main>

    );
}
