"use client";

import { api } from "~/trpc/react";
import { Button } from "../_components/ui/button";
import { List } from "../_components/ui/list";
import { Trash2Icon } from "lucide-react";
import EditarEvento from "./edit";
import Link from "next/link";

export default function Page() {
    const { data: events } = api.events.list.useQuery();
    const { mutateAsync: deleteEvent } = api.events.delete.useMutation();

    async function deletes(id: string) {
        await deleteEvent({ id });
    }

    return (
        <div>
            <h1 className="flex justify-center mt-10">Eventos</h1>
            <div className="flex justify-center p-10">
                <EditarEvento evento={null} />
            </div>
            <div>
                <List>
                    {events ? events.map((event) => (
                        <div className="border border-black p-10" key={event.id}>
                            <p>{event.type} - {event.description}</p>
                            <p>Usuario: {event.equipos?.name}</p>
                            <p>reporteId: {event.ReporteId ?? "---"}</p>
                            <p>OTId: {event.OTId}</p>
                            <p>intervencionId: {event.intervencionId}</p>
                            <p>tipo: {event.type}</p>
                            <p>Fecha: {event.ReporteId}</p>
                            <div className="flex gap-3">
                                <EditarEvento evento={event} />
                                <Button asChild>
                                    <Link href={`/events/${event.id}`}>
                                        Ver evento
                                    </Link>
                                </Button>
                                <Button onClick={() => deletes(event.id)}>
                                    <Trash2Icon />
                                </Button>
                            </div>
                        </div>
                    )) : "No existen eventos"}
                </List>
            </div>
        </div>
    );
}
