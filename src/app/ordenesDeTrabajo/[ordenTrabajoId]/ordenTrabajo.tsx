"use client";

type Estado = "pendiente" | "en proceso" | "completada" | "cancelada";

interface ordenDeTrabajo {
    id: string;
    equipo_id: string | null;
    userId: string | null;
    title: string | null;
    descripcion: string | null; 
    additional_info: string | null;
    createdAt: Date | null;
    fecha_programada: Date | null;
    fecha_finalizacion: Date | null;
    estado: Estado | null;
} 
export default function OrdenTrabajoIdPage(props: { params: { ordenTrabajoId: ordenDeTrabajo } }) {
    const ordenTrabajoId  = props.params.ordenTrabajoId;

    return (
        <div className="mt-4 border p-4">
            <p>Título: {ordenTrabajoId.title}</p>
            <p>Descripción: {ordenTrabajoId.descripcion}</p>
            <p>Equipo Asignado: {ordenTrabajoId.equipo_id}</p>
            <p>Fecha Programada: {ordenTrabajoId.fecha_programada?.toLocaleDateString()}</p>
            <p>Fecha de Finalización: {ordenTrabajoId.fecha_finalizacion?.toLocaleDateString()}</p>
            <p>Estado: {ordenTrabajoId.estado}</p>
        </div>
    )

}