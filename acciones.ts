"use server";

import { db } from "@/db";
import { Facturas, Estados, Clientes } from "@/db/schema";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";


export  async function crearAccion(formData: FormData) {
    const { userId, orgId } = await auth();
    // console.log('datos Formulario:', formData);
    

    if ( !userId) {
        return;
    }

    const valor = Math.floor(parseFloat(String(formData.get('valor')))*1000);
    const descripcion = formData.get('descripcion') as string;
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;

    const [cliente] = await db.insert(Clientes)
        .values({
            nombre,
            email,
            userId,
            organizacionId: orgId || null
        })
        .returning({
            id:Clientes.id
        })


    const resultados = await db.insert(Facturas)
        .values({
            valor,
            descripcion,
            userId,
            clienteId: cliente.id,
            estados: 'no pagada',
            organizacionId: orgId || null
        })
        .returning({
            id: Facturas.id
        })
    redirect(`/facturas/${resultados[0].id}`)   
    
}

export async function actualizarAccionEstados(formData: FormData) {
    const { userId, orgId} = await auth();

    if (!userId){
        return;
    }

    const id = formData.get('id') as string;
    const estados = formData.get('estados') as Estados;

    if ( orgId ) {
        await db.update(Facturas)
            .set({ estados })
            .where(
                and(
                    eq(Facturas.id, parseInt(id)),
                    eq(Facturas.organizacionId, orgId)
                ),
            );

    } else {
        await db.update(Facturas)
            .set({ estados })
            .where(
                and(
                    eq(Facturas.id, parseInt(id)),
                    eq(Facturas.userId, userId),
                    isNull(Facturas.organizacionId)
                )
            )
    }    
    

    //console.log('resultados', resultados);
    revalidatePath(`/facturas/${id}`, 'page')

}

export async function eliminarFactura(formData: FormData) {
    const { userId, orgId} = await auth();

    if (!userId){
        return;
    }

    const id = formData.get('id') as string;

    if (orgId) {
        await db.delete(Facturas)
            .where(
                and(
                    eq(Facturas.id, parseInt(id)),
                    eq(Facturas.organizacionId, orgId)
                )
            )
    } else {
        await db.delete(Facturas)
            .where(
                and(
                    eq(Facturas.id, parseInt(id)),
                    eq(Facturas.userId, userId),
                    isNull(Facturas.organizacionId)
                )
            )
    }
    

    //console.log('resultados', resultados);
    redirect('/dashboard')

}