"use client";

interface grupo {
    id: string;
    equipo_id: string | null;
    usuario_id: string | null;
} 
export default function GruposUsuariosPage(props: { params: { grupoUsuario: grupo } }) {
    const gruposUsuarios  = props.params.grupoUsuario;



    return (
        <div>
            <h1>{gruposUsuarios?.id}</h1>
            <p>idolo crack 5 palabras: crack</p>
        </div>
    )

}