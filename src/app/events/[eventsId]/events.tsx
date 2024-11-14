"use client";

interface evento {
    id: string;
    EquipoId: string | null;
    ReporteId: string | null;
    OTId: string | null;
    intervencionId: string | null;
    type: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
} 
export default function EventoPage(props: { params: { evento: evento } }) {
    const evento  = props.params.evento;

    return (
        <div>
            <p>usuario: {evento?.EquipoId}</p>
            <p>idenficador:{
                                    evento.EquipoId? "equipo":
                                    evento.ReporteId? "reporte":
                                    evento.OTId? "ordenes de trabajo":
                                    evento.intervencionId? "intervencion":
                                    "no se identifico"
                                    }</p>
            <p>tipo:{evento?.type}</p>
            <p>descripcion:{evento?.description}</p>
            <p>fecha:{evento?.createdAt?.toLocaleDateString()}</p>

        </div>
    )

}