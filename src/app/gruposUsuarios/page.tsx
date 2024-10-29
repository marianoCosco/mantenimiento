"use client"

import { api } from "~/trpc/react"
import Link from "next/link"
import { List, ListTile } from "../_components/ui/list";

export default function Page() {
    const { data: gruposDeUsuarios } = api.gruposUsuarios.list.useQuery();
    const { mutateAsync: createGruposDeUsuarios } = api.gruposUsuarios.create.useMutation();
    const { mutateAsync: deleteGruposDeUsuarios } = api.gruposUsuarios.delete.useMutation();
    const { mutateAsync: updateGruposDeUsuarios } = api.gruposUsuarios.update.useMutation();
    const { data:equipos } = api.equipos.list.useQuery();
    const { data:usuarios } = api.usuarios.list.useQuery();

    async function creacion() {
        if(equipos && usuarios) {
            await createGruposDeUsuarios({
                usuario_id: usuarios[0]?.id ?? "",
                equipo_id: equipos[0]?.id ?? "" ,
            })
        }
    }

    async function deletes(id: string) {
        await deleteGruposDeUsuarios({id: id})
    }

    async function updates(id: string) {
        if(equipos && usuarios) {   
            await updateGruposDeUsuarios({
                id: id,
                usuario_id: usuarios[0]?.id ?? "",
                equipo_id: equipos[0]?.id ?? "" ,
            })
        }
    }
    return (
        <div>
            <h1>grupos de usuarios</h1>
            <List>

            {gruposDeUsuarios? gruposDeUsuarios?.map((gruposDeUsuario) => (
                <div key={gruposDeUsuario.id}>
                    <p>id: {gruposDeUsuario.id}</p>
                    <p>usuario: {gruposDeUsuario.usuario_id}</p>
                    <p>grupo: {gruposDeUsuario.equipo_id}</p>
                    <button onClick={() => updates(gruposDeUsuario.id)}>Update</button>
                    <button onClick={() => deletes(gruposDeUsuario.id)}>Delete</button>
            <ListTile title= {"ver grupos de usuario"} href={`/gruposUsuarios/${gruposDeUsuario.id}`} />   
            </div>
            )): <h1>no existen grupos de usuarios</h1>}
            </List>
            <button onClick={() => creacion()}>Create</button>
        </div>
    )
}