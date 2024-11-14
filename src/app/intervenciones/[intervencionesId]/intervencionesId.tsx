"use client";

import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

export default function IntervencionesIdPage(props: { params: { intervencionesId: string } }) {
    const intervencionesId = props.params.intervencionesId;
    const { data: intervencion } = api.intervenciones.get.useQuery({ id: intervencionesId });

    // Consulta la orden de trabajo si intervencion está cargada y tiene una orden de trabajo
    const ordenTrabajoId = intervencion?.ordenesTrabajo?.id;
    const { data: ordenDeTrabajo } = ordenTrabajoId? api.ordenesDeTrabajo.get.useQuery({ id: ordenTrabajoId }): { data: null };
    const { mutateAsync: updateOrdenDeTrabajo } = api.ordenesDeTrabajo.update.useMutation();
    const {mutateAsync: createEvent } = api.events.create.useMutation();

    async function handleEstadoChange(nuevoEstado: "completada" | "cancelada") {
        if (ordenDeTrabajo) {
            const updatedOrdenDeTrabajo = {
                id: ordenDeTrabajo.id,
                createdAt: ordenDeTrabajo.createdAt ?? new Date(),
                equipo_id: ordenDeTrabajo.equipo_id ?? "", 
                userId: ordenDeTrabajo.userId ?? "", 
                title: ordenDeTrabajo.title ?? "", 
                descripcion: ordenDeTrabajo.descripcion ?? "",
                additional_info: ordenDeTrabajo.additional_info ?? "",
                fecha_programada: ordenDeTrabajo.fecha_programada ?? new Date(), 
                fecha_finalizacion: ordenDeTrabajo.fecha_finalizacion ?? new Date() , 
                estado: nuevoEstado,
            };
            await updateOrdenDeTrabajo(updatedOrdenDeTrabajo);
        if(nuevoEstado = "completada"){
            await createEvent({
                description: `Intervencion aprobada: ${intervencion?.title}`,
                createdAt: new Date(),
                updatedAt: new Date(),
                EquipoId: "",
                ReporteId: "",
                OTId: "",
                intervencionId: intervencionesId,
                type: "Finalización",
            });
        } else if(nuevoEstado = "cancelada") {
            await createEvent({
                description: `Intervencion cancelada: ${intervencion?.title}`,
                createdAt: new Date(),
                updatedAt: new Date(),
                EquipoId: "",
                ReporteId: "",
                OTId: "",
                intervencionId: intervencionesId,
                type: "cancelada",
            });
        }
        
    }
}

    return (
        <div className="mt-4 border p-4">
            <p>titulo: {intervencion?.title}</p>
            <p>descripcion: {intervencion?.descripcion}</p>
            <p>usuario que hizo la intervencion: {intervencion?.usuario?.nombre}</p>
            <p>orden de trabajo: {intervencion?.ordenesTrabajo?.title}</p>
            <p>fecha de creacion: {intervencion?.createdAt?.toDateString()}</p>
            <div>
            <Button onClick={() => handleEstadoChange("cancelada")}>
                Cancelar OT
            </Button>
            <Button onClick={() => handleEstadoChange("completada")}>
                Aprobar OT
            </Button>
            </div>
        </div>
    )

}