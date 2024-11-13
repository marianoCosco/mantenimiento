"use client";

import { api } from "~/trpc/react";
import { Button } from "../_components/ui/button";
import { List } from "../_components/ui/list";
import Link from "next/link";

export default function Page() {
    const { data: events } = api.events.list.useQuery()


    return (
        <div>
            <h1 className="flex justify-center mt-10">Eventos</h1>
            <div className="flex justify-center p-10"></div>
            <div>
                <List>
                    {events && events.length > 0 ? (
                        events.map((event) => (
                            <div className="border border-black p-10 mb-4" key={event.id}>
                                <p><strong>Tipo:</strong> {event.type}</p>
                                <p><strong>Descripción:</strong> {event.description}</p>
                                <p><strong>Usuario:</strong> {event.EquipoId ?? "Desconocido"}</p>
                                <p><strong>Identificador:</strong> 
                                    {
                                    event.EquipoId? "equipo":
                                    event.ReporteId? "reporte":
                                    event.OTId? "ordenes de trabajo":
                                    event.intervencionId? "intervencion":
                                    "no se identifico"
                                    }
                                </p>
                                <p><strong>Fecha:</strong> {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : "Fecha no disponible"}</p>
                                <div className="flex gap-3 mt-4">
                                    <Link href={`/events/${event.id}`}>
                                        <Button>Ver evento</Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No existen eventos registrados</p>
                    )}
                </List>
            </div>
        </div>
    );
}
