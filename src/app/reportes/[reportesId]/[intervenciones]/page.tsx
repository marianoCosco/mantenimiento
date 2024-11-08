"use client"

import {api } from "~/trpc/react"
import { Button } from "../../../_components/ui/button"
import { List } from "../../../_components/ui/list"
import { Trash2Icon } from "lucide-react"
import EditarIntervenciones from "./edit"

export default function IntervencionPage(props: { params: { reportesId: string } }) {
    const reportesId  =props.params.reportesId;
    const {data: reporte} = api.reportes.get.useQuery({id: reportesId});
    const { data: intervenciones } = api.intervenciones.list.useQuery()
    const { mutateAsync: deleteIntervencion } = api.intervenciones.delete.useMutation()
    if(reporte) {
        async function deletes(id: string) {
            await deleteIntervencion({ id })
        }
        return (    
            <div>
                <h1 className="flex justify-center mt-10">Crear intervencion para el reporte {reporte.id}</h1>
                <EditarIntervenciones intervenciones= {null} />
            <div>
            <div>
                <List>
                    {intervenciones? intervenciones?.map((intervencion) => (
                        <div className="border border-black p-10" key={intervencion.id}>
                            <p>titulo: {intervencion.title}</p>
                            <p>orden de trabajo: {intervencion?.ordenesTrabajo?.title}</p>
                            <p>usuario que intervino: {intervencion?.usuario?.nombre}</p>
                            <p>fecha de creacion: {intervencion.createdAt?.toDateString()}</p>
                            <div className="flex gap-4 items-center p-2 bg-gray-100 rounded-lg shadow-sm">
                            <EditarIntervenciones intervenciones= {intervencion} />
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
            </div>
            </div>
            </div>
        )
    }
    else{
        return (
            <div> no existe estaaaaaa intervencion</div>
        )
    }
}