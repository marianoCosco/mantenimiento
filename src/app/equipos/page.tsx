"use client"

import { api } from "~/trpc/react"

export default function Page() {
    const { data: equipos } = api.equipos.list.useQuery()
    const { mutateAsync: crearEquipo } = api.equipos.create.useMutation()
    const { mutateAsync: editarEquipo } = api.equipos.update.useMutation()
    const { data: getEquipo } = api.equipos.get.useQuery({ id: "1" })
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
                        <button onClick={() => editar(equipo.id)}>Editar</button>
                        <button onClick={() => borrar(equipo.id)}>Borrar</button>
                    </div>
                )): <h1>No hay equipos</h1> }
                <button onClick={() => creacion()}>Crear</button>
            </div>
        </div>
    )
}