"use client"

import { api } from "~/trpc/react"

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
            <h1>Intervenciones</h1>
            <div>
                {intervenciones? intervenciones?.map((intervencion) => (
                    <div key={intervencion.id}>
                        <p>id: {intervencion.id}</p>
                        <p>descripcion: {intervencion.descripcion}</p>
                        <button onClick={() => deletes(intervencion.id)}>Delete</button>
                        <button onClick={() => updates(intervencion.id)}>Update</button>
                    </div>
                )): <h1>no existen intervenciones</h1>}
            </div>
            <button onClick={creacion}>Crear intervenciones</button>
        </div>
    )
}