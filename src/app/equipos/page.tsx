"use client"

import { api } from "~/trpc/react"

export default function Page() {
    const { data: equipos } = api.equipos.list.useQuery()
    const { mutateAsync: crearEquipo } = api.equipos.create.useMutation()
    const { mutateAsync: editarEquipo } = api.equipos.update.useMutation()
    const { mutateAsync: deleteEquipo } = api.equipos.delete.useMutation()
    async function creacion() {
        await crearEquipo({
            name: "1",
            qr_code: "1",
            state: "1",
            last_work: new Date,
            numberId: 1,
            description: "1",
            createdAt: new Date,
            updatedAt: new Date
        })
    }

    async function editar(id: string) {
        await editarEquipo({
            id: id,
            name: "3",
            qr_code: "1",
            state: "1",
            last_work: new Date,
            numberId: 1,
            description: "1",
            createdAt: new Date,
            updatedAt: new Date
        })
    }
    async function borrar(id: string) {
        await deleteEquipo({
            id: id,
        })
    }
    return (
        <div>
            <h1>Equipos</h1>
            <div>
                {equipos? equipos?.map((equipo) => (
                    <div key={equipo.id}>
                        <p>{equipo.name}</p>
                        <div className="flex gap-3">
                            <button onClick={() => editar(equipo.id)}>Editar</button>
                            <button onClick={() => borrar(equipo.id)}>Borrar</button>
                            <button onClick={() => window.location.href = `/equipos/${equipo.id}`} > ver equipo</button>
                        </div>
                    </div>
                )): <h1>No hay equipos</h1> }
                <button onClick={() => creacion()}>Crear</button>
            </div>
        </div>
    )
}