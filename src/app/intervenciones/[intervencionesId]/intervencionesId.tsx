"use client";

interface intervencion {
    id: string,
    userId: string | null,
    title: string | null,
    OTid:string | null,
    descripcion: string | null,
    createdAt: Date | null,
} 
export default function IntervencionesIdPage(props: { params: { intervencionesId: intervencion } }) {
    const intervencionesId  = props.params.intervencionesId;

    return (
        <div className="mt-4 border p-4">
            <p>usuario que hizo la intervencion: {intervencionesId.userId}</p>
            <p>orden de trabajo: {intervencionesId.OTid}</p>
            <p>titulo: {intervencionesId.title}</p>
            <p>descripcion: {intervencionesId.descripcion}</p>
            <p>fecha de creacion: {intervencionesId.createdAt?.toDateString()}</p>
        </div>
    )

}