"use client"

import { api } from "~/trpc/react"
import { Button } from "../_components/ui/button"
import { List } from "../_components/ui/list"

import { Trash2Icon } from "lucide-react"
import  EditarEquipo  from "./edit" 
import Link from "next/link"
export default function Page() {
    const { data: equipos } = api.equipos.list.useQuery()
    const { mutateAsync: deleteEquipo, isPending : isLoadingDelete } = api.equipos.delete.useMutation()
    
    async function borrar(id: string) {
        await deleteEquipo({id})
    }

    return (
        <div>
            <h1 className="flex justify-center mt-10">Equipos</h1>
            <div className="flex justify-center p-10">
                <EditarEquipo equipo={null} />
            </div>
            <div>
                <div className="flex justify-center p-10">
                </div>
                <div>
                    <List>
                        {equipos ? (
                            equipos.map((equipo) => (
                                <div className="border border-black p-10" key={equipo.id}>
                                    <p>identificador del equipo: {equipo.numberId}</p>
                                    <p>Equipo: {equipo.name}</p>
                                    <p>estado: {equipo.state}</p>
                                    <div className="flex gap-3">
                                    <EditarEquipo equipo={equipo} />
                                        <Button>
                                            <Link href={`/equipos/${equipo.id}`}>
                                                Ver equipo
                                            </Link>
                                        </Button>
                                        <Button onClick={() => borrar(equipo.id)} disabled= {isLoadingDelete}>
                                            <Trash2Icon />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>No hay equipos</h1>
                        )}
                    </List>
                </div>
            </div>
        </div>
    )
}
