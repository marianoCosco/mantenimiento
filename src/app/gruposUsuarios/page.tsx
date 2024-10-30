"use client"

import { api } from "~/trpc/react"
import { List } from "../_components/ui/list";
import { Button } from "../_components/ui/button";
import { Trash2Icon } from "lucide-react";

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
            <h1 className="flex justify-center mt-10">grupos de usuarios </h1>
            <List>
                {gruposDeUsuarios? gruposDeUsuarios?.map((gruposDeUsuario) => (
                    <div className="border border-black p-10" key={gruposDeUsuario.id}>
                        <p>id: {gruposDeUsuario.id}</p>
                        <p>usuario: {gruposDeUsuario.usuario_id}</p>
                        <p>grupo: {gruposDeUsuario.equipo_id}</p>
                        <Button onClick={() => updates(gruposDeUsuario.id)}>
                        Actualizar
                        </Button>
                        <Button onClick={() => window.location.href = `/gruposUsuarios/${gruposDeUsuario.id}`} >
                            ver reportes
                        </Button>
                        <Button onClick={() => deletes(gruposDeUsuario.id)}>
                            <Trash2Icon/>
                        </Button>
            </div>
            )): <h1>no existen grupos de usuarios</h1>}
            </List>
            <div className="flex justify-center mt-10">
                <Button onClick={() => creacion()} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                    Crear grupo de usuarios
                </Button>
            </div>
        </div>
    )
}