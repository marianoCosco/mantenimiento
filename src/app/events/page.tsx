"use client"

import { api } from "~/trpc/react";
import { Button } from "../_components/ui/button";
import { List } from "../_components/ui/list";
import { Trash2Icon } from "lucide-react";
export default function Page() {
    const { data: events } = api.events.list.useQuery();
    const { mutateAsync: createEvent } = api.events.create.useMutation();
    const { data:equipos } = api.equipos.list.useQuery();
    const { data:reportes } = api.reportes.list.useQuery();
    const {mutateAsync: deleteEvent } = api.events.delete.useMutation();
    const {mutateAsync: updateEvent } = api.events.update.useMutation();
    const { data: ordenTrabajo } = api.ordenesDeTrabajo.list.useQuery();
    const { data:intervenciones } = api.intervenciones.list.useQuery(); // {id:int}
    // tuve problemas para importar el get
    async function creacion() {
        if(equipos && reportes && intervenciones && ordenTrabajo) {
            await createEvent({
                EquipoId: equipos[0]?.id ?? "",
                ReporteId: reportes[0]?.id ?? "",
                OTId: ordenTrabajo[0]?.id ?? "", 
                intervencionId: intervenciones[0]?.id ?? "",
                type: "1",
                description: "1",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            console.log("hola")
        }
    }

    async function deletes(id: string) {
        await deleteEvent({id: id})
    }

    async function updates(id: string) {
        if(equipos && reportes ) {
            await updateEvent({
                id: id,
                EquipoId: equipos[0]?.id ?? "",
                ReporteId: reportes[0]?.id ?? "",
                OTId: "1", 
                intervencionId: equipos[0]?.id ?? "",
                type: "1",
                description: "2",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }
    }

    return (
        <div>
            <h1 className="flex justify-center mt-10">Eventos</h1>
            <div>
                <List>
                    {events? events?.map((event) =>(
                        <div className="border border-black p-10" key={event.id}>
                            <p>id: {event.description}</p>
                            <div className="flex gap-3">
                                <Button onClick={() => updates(event.id)}>
                                Actualizar
                                </Button>
                                <Button onClick={() => window.location.href = `/events/${event.id}`} >
                                    ver evento
                                </Button>
                                <Button onClick={() => deletes(event.id)}>
                                    <Trash2Icon/>
                                </Button>
                            </div>
                        </div>
                    )): "no existen eventos"}
                </List>
            </div>
            <div className="flex justify-center p-10">
                <Button onClick={creacion}>
                    Crear Evento
                </Button>
            </div>
        </div>
    )


}