"use client";












interface usuario {
    id: string;
    nombre: string  | null;
    legajo: string | null;
    email: string | null;
    telefono: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export default function UsuariosPage(props: {params: { usuarioId: usuario }}) {
    
    const usuarioId = props.params.usuarioId;
    
    return (
        <div>
            
            <h1>id:{usuarioId?.id}</h1>
            <p>idolo crack 5 palabras: crack</p>
        </div>
    )
}