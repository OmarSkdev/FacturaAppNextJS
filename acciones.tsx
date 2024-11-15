"use server";

import { db } from "@/db";
import { Facturas } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function crearAccion(formData: FormData) {
    const { userId } = await auth();
    // console.log('datos Formulario:', formData);
    const valor = Math.floor(parseFloat(String(formData.get('valor')))*1000);
    const descripcion = formData.get('descripcion') as string;

    if ( !userId) {
        return;
    }

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