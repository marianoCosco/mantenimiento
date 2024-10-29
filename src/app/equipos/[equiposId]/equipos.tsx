"use client";

interface equipo {
    id: string;
    name: string | null;
    qr_code: string | null;
    state: string  | null;
    last_work: Date | null;
    numberId: number | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date | null;
} 
export default function GruposPage(props: { params: { equipo: equipo } }) {
    const equipo  = props.params.equipo;

    return (
        <div>
            <h1>{equipo?.name}</h1>
            <p>idolo crack 5 palabras: crack</p>
        </div>
    )

}