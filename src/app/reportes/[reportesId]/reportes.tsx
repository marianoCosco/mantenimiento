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
        <div className="mt-4 border p-4">
            <p>descripcion: {reportesId.descripcion}</p>
            <p>nombre del equipo: {reportesId.equipo_id}</p>
            <p>fecha de creacion: {reportesId.createdAt?.toDateString()}</p>
            <p>tipo de reporte: {reportesId.tipo_reporte}</p>
            <p>periodo: {reportesId.periodo}</p>
        </div>
    )

}