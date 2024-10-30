"use client"

import { api } from "~/trpc/react"
import { Button } from "../_components/ui/button"
import { List } from "../_components/ui/list"
import { Trash2Icon } from "lucide-react"

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
            <h1 className="flex justify-center mt-10">Equipos</h1>
            <div>
                <List>
                    {equipos? equipos?.map((equipo) => (
                        <div className="border border-black p-10" key={equipo.id}>
                            <p>equipo:{equipo.name}</p>
                            <div className="flex gap-3">
                                <Button onClick={() => editar(equipo.id)}>
                                Actualizar
                                </Button>
                                <Button onClick={() => window.location.href = `/equipos/${equipo.id}`} >
                                    ver equipo
                                </Button>
                                <Button onClick={() => borrar(equipo.id)}>
                                    <Trash2Icon/>
                                </Button>
                            </div>
                        </div>
                    )): <h1>No hay equipos</h1> }
                </List>
                <div className="flex justify-center p-10">
                    <Button onClick={() => creacion()}>
                        Crear equipo
                    </Button>
                </div>
            </div>
        </div>
    )
}