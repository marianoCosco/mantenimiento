"use client"

import {api } from "~/trpc/react"
import { Button } from "../../_components/ui/button";
import OrdenTrabajoIdPage from "./ordenTrabajo"

export default function OrdenTrabajoPage(props: { params: { ordenTrabajoId: string } }) {

    const ordenTrabajoId  =props.params.ordenTrabajoId;
    const {data: ordenDeTrabajo} = api.ordenesDeTrabajo.get.useQuery({id: ordenTrabajoId});
    const { mutateAsync: updateOrdenDeTrabajo } = api.ordenesDeTrabajo.update.useMutation();
    async function handleEstadoChange(nuevoEstado: "pendiente" | "en proceso" | "completada" | "cancelada") {
        if (ordenDeTrabajo) {
            const updatedOrdenDeTrabajo = {
                id: ordenDeTrabajo.id,
                createdAt: ordenDeTrabajo.createdAt ?? new Date(), // Asigna una fecha actual si es null
                equipo_id: ordenDeTrabajo.equipo_id ?? "", // Asigna un valor por defecto si es null
                userId: ordenDeTrabajo.userId ?? "", // Asigna un valor por defecto si es null
                title: ordenDeTrabajo.title ?? "", // Asigna un valor por defecto si es null
                descripcion: ordenDeTrabajo.descripcion ?? "", // Asigna un valor por defecto si es null
                additional_info: ordenDeTrabajo.additional_info || "", // Asegúrate de que no sea undefined
                fecha_programada: ordenDeTrabajo.fecha_programada ?? new Date(), // Asigna una fecha actual si es null
                fecha_finalizacion: ordenDeTrabajo.fecha_finalizacion ?? new Date() , // Puede ser null si es opcional
                estado: nuevoEstado,
            };
    
            await updateOrdenDeTrabajo(updatedOrdenDeTrabajo);
        }
    }

    if (!ordenDeTrabajo) return <p>Orden de trabajo no encontrada</p>;
        return (
            <div className="p-6">
                <h2 className="text-2xl font-semibold">Detalle de Orden de Trabajo</h2>
                    <OrdenTrabajoIdPage params={{ordenTrabajoId: ordenDeTrabajo}} />
                <div className="mt-4">
                
                <Button onClick={() => handleEstadoChange("en proceso")}>Comenzar OT</Button>
                
                <Button onClick={() => handleEstadoChange("cancelada")}>Cancelar OT</Button>
                {ordenDeTrabajo.estado === "en proceso" && (
                    <Button onClick={() => handleEstadoChange("completada")}>Aprobar OT</Button>
                )}
            </div>
                </div>
        )
}