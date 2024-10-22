"use client"

import { api } from "~/trpc/react";
export default function Page() {
    const { data: events } = api.events.get.useQuery();
    const { mutateAsync: createEvent } = api.events.create.useMutation();
    
    // tuve problemas para importar el get
    async function creacion() {
        await createEvent({
            equipoId: "1",
            reportId: "1",
            otid: "1", 
            intervencionId: "1",
            type: "1",
            description: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
        })
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