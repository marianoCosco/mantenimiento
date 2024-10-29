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
        <div>
            <h1>id:{ordenTrabajoId?.id}</h1>
            <p>chavales chavalines</p>
        </div>
    )

}