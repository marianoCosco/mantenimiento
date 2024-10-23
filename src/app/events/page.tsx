"use client"

import { api } from "~/trpc/react";
export default function Page() {
    const { data: events } = api.events.list.useQuery();
    const { mutateAsync: createEvent } = api.events.create.useMutation();
    const { data:equipos } = api.equipos.list.useQuery();
    const { data:reportes } = api.reportes.list.useQuery();
    const { data:intervenciones } = api.intervenciones.list.useQuery(); // {id:int}
    // tuve problemas para importar el get
    async function creacion() {
        if(equipos && reportes && intervenciones) {
            
            await createEvent({
                equipo_id: equipos[0]?.id ?? "",
                report_id: reportes[0]?.id ?? "",
                ot_id: "1", 
                intervencion_id: intervenciones[0]?.id ?? "",
                type: "1",
                description: "1",
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
                        <p>id: {event.id}</p>
                        </div>
                        )): "no existen eventos"}
            </div>
            <button onClick={creacion}>Crear Evento</button>
        </div>
    )


}