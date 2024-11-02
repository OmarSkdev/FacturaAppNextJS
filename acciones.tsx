"use server";

import { db } from "@/db";
import { Facturas } from "@/db/schema";
import { redirect } from "next/navigation";

export async function crearAccion(formData: FormData) {
    
    // console.log('datos Formulario:', formData);
    const valor = Math.floor(parseFloat(String(formData.get('valor')))*1000);
    const descripcion = formData.get('descripcion') as string;

    const resultados = await db.insert(Facturas)
        .values({
            valor,
            descripcion,
            estados: 'no pagada'
        })
        .returning({
            id: Facturas.id
        })
    redirect(`/facturas/${resultados[0].id}`)   
    
}