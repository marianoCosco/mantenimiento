"use client"

import { api } from "~/trpc/react"

export default function Page() {
    const { data: equipos } = api.equipos.list.useQuery()
    const { mutateAsync: crearEquipo } = api.equipos.create.useMutation()
    const { mutateAsync: editarEquipo } = api.equipos.update.useMutation()

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
    return (
        <div>
            <h1>Equipos</h1>
            <div>
                {equipos? equipos?.map((equipo) => (
                    <div key={equipo.id}>
                        <p>{equipo.name}</p>
                        <button onClick={() => creacion()}>Crear</button>
                        <button onClick={() => editar(equipo.id)}>Editar</button>
                    </div>
                )): <h1>No hay equipos</h1> }
                <button onClick={() => creacion()}>Crear</button>
            </div>
        </div>
    )
}