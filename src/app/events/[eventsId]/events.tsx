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
            <h1>equipo:{evento?.EquipoId}</h1>
            <p>q grande la banda</p>
        </div>
    )

}