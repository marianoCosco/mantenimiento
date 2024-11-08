"use client"

import { api } from "~/trpc/react"
import { Button } from "../_components/ui/button"
import { List } from "../_components/ui/list"
import Link from "next/link"

export default function Page() {
    const { data: intervenciones } = api.intervenciones.list.useQuery()
    



    return (
        <div>
            <h1 className="flex justify-center mt-10">Intervenciones</h1>
            <div>
                <List>
                    {intervenciones? intervenciones?.map((intervencion) => (
                        <div className="border border-black p-10" key={intervencion.id}>
                            <p>descripcion: {intervencion.descripcion}</p>
                            <p>orden de trabajo:{intervencion.ordenesTrabajo?.title ?? "-"}</p>
                            <p>Usuario que intervino:{intervencion.usuario?.nombre ?? "a"}</p>
                            <p>fecha de creacion:{intervencion.createdAt?.toLocaleDateString() ?? "aS"}</p>
                            <div className="flex gap-3">
                            <Button asChild>
                                <Link href={`/intervencionesId/${intervencion.id}`}>
                                    Ver intervencion
                                </Link>
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