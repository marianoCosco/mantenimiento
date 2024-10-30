"use client";

type Reportes = "intervencion realizada" | "estado del equipo";
type Periodo = "semanal" | "mensual" | "anual";
interface reporte {
    id: string
    equipo_id: string | null
    userId: string | null
    tipo_reporte: Reportes | null
    descripcion: string | null
    createdAt: Date | null
    periodo: Periodo | null
    
} 
export default function ReporteIdPage(props: { params: { reportesId: reporte } }) {
    const reportesId  = props.params.reportesId;

    return (
        <div>
            <h1>id:{reportesId?.id}</h1>
            <p>borja hacelo real por favor</p>
        </div>
    )

}