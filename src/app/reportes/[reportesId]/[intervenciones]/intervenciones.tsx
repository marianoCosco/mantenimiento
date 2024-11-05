"use client";

interface intervencion {
    id: string
    userId: string | null
    OTid: string | null
    title: string | null
    descripcion: string | null
    createdAt: Date | null
    
} 
export default function IntervencionIdPage(props: { params: { intervencionesId: intervencion } }) {
    const IntervencionId  = props.params.intervencionesId;

    return (
        <div>
            <h1>id:{IntervencionId?.id}</h1>
            <p>q golazo de leo messi</p>
        </div>
    )

}