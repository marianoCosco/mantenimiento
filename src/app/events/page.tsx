"use client"

import { api } from "~/trpc/react";
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
            <h1>Eventos</h1>
            <div>
                {events? events?.map((event) =>(
                    <div key={event.id}>
                        <p>id: {event.description}</p>
                        <button onClick={() => deletes(event.id)}>Delete</button>
                        <button onClick={() => updates(event.id)}>Update</button>
                        </div>
                        )): "no existen eventos"}
            </div>
            <button onClick={creacion}>Crear Evento</button>
        </div>
    )


}