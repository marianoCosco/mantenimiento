"use client";

interface grupo {
    id: string;
    name: string;
    qr_code: string;
    state: string;
    last_work: Date;
    numberId: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
} 
export default function GruposPage(props: { params: { grupo: grupo } }) {
    const grupo  = props.params.grupo;



    return (
        <div>
            <h1>{grupo?.name}</h1>
            <p>idolo crack 5 palabras: crack</p>
        </div>
    )

}