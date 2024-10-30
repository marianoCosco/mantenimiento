"use client"

import { api } from "~/trpc/react"
import { Button } from "../_components/ui/button"
import { List } from "../_components/ui/list"
import { Trash2Icon } from "lucide-react"

export default function Page() {
    const { data: intervenciones } = api.intervenciones.list.useQuery()
    const { mutateAsync: createIntervencion } = api.intervenciones.create.useMutation()
    const { mutateAsync: deleteIntervencion } = api.intervenciones.delete.useMutation()
    const { mutateAsync: updateIntervencion } = api.intervenciones.update.useMutation()
    const { data:users } = api.usuarios.list.useQuery()
    async function creacion() {
        if(users) {
            await createIntervencion({
                user_id: users[0]?.id ?? "",
                ot_id: "1",
                title: "1",
                descripcion: "1",
                created_At: new Date(),
            })
        }
    }

    async function deletes(id: string) {
        await deleteIntervencion({ id })
    }

    async function updates(id: string) {
        if(users){
            await updateIntervencion({
                id,
                user_id:  users[0]?.id ?? "",
                ot_id: "1",
                title: "1",
                descripcion: "2",
                created_At: new Date(),
            })
        }
    }

    return (
        <div>
            <h1 className="flex justify-center mt-10">Intervenciones</h1>
            <div>
                <List>
                    {intervenciones? intervenciones?.map((intervencion) => (
                        <div className="border border-black p-10" key={intervencion.id}>
                            <p>id: {intervencion.id}</p>
                            <p>descripcion: {intervencion.descripcion}</p>
                            <div className="flex gap-3">
                                <Button onClick={() => updates(intervencion.id)}>
                                Actualizar
                                </Button>
                                <Button onClick={() => window.location.href = `/intervenciones/${intervencion.id}`}>
                                    ver intervencion
                                </Button>
                                <Button onClick={() => deletes(intervencion.id)}>
                                    <Trash2Icon/>
                                </Button>
                            </div>
                        </div>
                    )): <h1>no existen intervenciones</h1>}
                </List>
            </div>
            <div className="flex justify-center p-10">
                <Button onClick={creacion} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                    Crear intervenciones
                </Button>
            </div>
        </div>
    )
}