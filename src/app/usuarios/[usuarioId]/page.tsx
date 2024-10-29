"use client";

import {api} from "~/trpc/react";

import UsuariosPage from "./usuarios";

export default function UsuarioPage(props: {params: { usuarioId: string }}) {
    const usuarioId = props.params.usuarioId;

    const {data:usuario} = api.usuarios.get.useQuery({id: usuarioId});
    if(!usuario){
        return (
            <div>
            <h1>no existe</h1>
            </div>            
        )
    } 
    return (  
        <div>
            <h1>id: {usuario?.id}</h1>
            <UsuariosPage params={{usuarioId: usuario}} />
        </div>        
    )

}