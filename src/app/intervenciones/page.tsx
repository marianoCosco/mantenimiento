"use client"

import { api } from "~/trpc/react"
import { Button } from "../_components/ui/button"
import { List } from "../_components/ui/list"
import { Trash2Icon } from "lucide-react"

export default function Page() {
    const { data: intervenciones } = api.intervenciones.list.useQuery()
    const { data:users } = api.usuarios.list.useQuery()
    



    return (
        <div>
            <h1 className="flex justify-center mt-10">Intervenciones</h1>
            <div>
                <List>
                    {intervenciones? intervenciones?.map((intervencion) => (
                        <div className="border border-black p-10" key={intervencion.id}>
                            <p>descripcion: {intervencion.descripcion}</p>
                            <p>orden de trabajo:{intervencion.OTid}</p>
                            <p>Usuario que intervino:{intervencion.userId}</p>
                            <p>fecha de creacion:{intervencion.createdAt?.toLocaleDateString()}</p>
                            <div className="flex gap-3">
                                <Button onClick={() => window.location.href = `/intervenciones/${intervencion.id}`}>
                                    ver intervencion
                                </Button>
                            </div>
                        </div>
                    )): <h1>no existen intervenciones</h1>}
                </List>
            </div>
            <div className="flex justify-center p-10">
                
            </div>
        </div>
    )
}