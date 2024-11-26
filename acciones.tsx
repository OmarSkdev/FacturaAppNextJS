"use server";

import { db } from "@/db";
import { Facturas, Estados } from "@/db/schema";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";


export  async function crearAccion(formData: FormData) {
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
            userId,
            estados: 'no pagada'
        })
        .returning({
            id: Facturas.id
        })
    redirect(`/facturas/${resultados[0].id}`)   
    
}

export async function actualizarAccionEstados(formData: FormData) {
    const { userId} = await auth();

    if (!userId){
        return;
    }

    const id = formData.get('id') as string;
    const estados = formData.get('estados') as Estados;

    const resultados = await db.update(Facturas)
    .set({ estados })
    .where(
        and(
            eq(Facturas.id, parseInt(id)),
            eq(Facturas.userId, userId)
        )
    )

    //console.log('resultados', resultados);
    revalidatePath(`/facturas/${id}`, 'page')

}

export async function eliminarFactura(formData: FormData) {
    const { userId} = await auth();

    if (!userId){
        return;
    }

    const id = formData.get('id') as string;

    const resultados = await db.delete(Facturas)
    
    .where(
        and(
            eq(Facturas.id, parseInt(id)),
            eq(Facturas.userId, userId)
        )
    )

    //console.log('resultados', resultados);
    redirect('/dashboard')

}