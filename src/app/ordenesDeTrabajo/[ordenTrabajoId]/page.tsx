"use client"

import {api } from "~/trpc/react"
import { Button } from "../../_components/ui/button";
import OrdenTrabajoIdPage from "./ordenTrabajo"
import { useQueryClient } from "@tanstack/react-query";

export default function OrdenTrabajoPage(props: { params: { ordenTrabajoId: string } }) {

    const ordenTrabajoId  =props.params.ordenTrabajoId;
    
    const queryClient = useQueryClient()
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
                additional_info: ordenDeTrabajo.additional_info ?? "", // Asegúrate de que no sea undefined
                fecha_programada: ordenDeTrabajo.fecha_programada ?? new Date(), // Asigna una fecha actual si es null
                fecha_finalizacion: ordenDeTrabajo.fecha_finalizacion ?? new Date() , // Puede ser null si es opcional
                estado: nuevoEstado,
            };
    
            await updateOrdenDeTrabajo(updatedOrdenDeTrabajo);
            await queryClient.invalidateQueries();
            
        }
    }

    if (!ordenDeTrabajo) return <p>Orden de trabajo no encontrada</p>;
        return (
            <div className="p-6 flex flex-col items-center">
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <OrdenTrabajoIdPage ordenTrabajo={ordenDeTrabajo} />
    </div>
    
    <div className="mt-6 flex justify-center space-x-4">
        {ordenDeTrabajo.estado !== "en proceso" && (
            <Button
                onClick={() => handleEstadoChange("en proceso")}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
            >
                Comenzar OT
            </Button>
        )}
        {ordenDeTrabajo.estado !== "cancelada" && (
            <Button
                onClick={() => handleEstadoChange("cancelada")}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
            >
                Cancelar OT
            </Button>
        )}
        
        {ordenDeTrabajo.estado === "en proceso" && (
            <Button
                onClick={() => handleEstadoChange("completada")}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Aprobar OT
            </Button>
        )}
    </div>
</div>
        )
}