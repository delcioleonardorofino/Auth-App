'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export async function updateUserImage(newUrl: string){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) throw new Error('Acesso negado!')

    await auth.api.updateUser({
        body:{
            image: newUrl
        },
        headers: await headers()
    })
}