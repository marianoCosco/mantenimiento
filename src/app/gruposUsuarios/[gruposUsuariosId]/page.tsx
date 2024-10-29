"use client"

import {api } from "~/trpc/react"

import GruposUsuariosPage from "./gruposUsuarios"


export default function GrupoPage(props: { params: { gruposUsuariosId: string } }) {

    const gruposUsuariosId  =props.params.gruposUsuariosId;

    const {data:grupoUsuario} = api.gruposUsuarios.get.useQuery({id: gruposUsuariosId});
    console.log({algo:gruposUsuariosId})
    if(grupoUsuario) {
        return (
            <div>
                <p>id: {grupoUsuario?.id}</p>
                <GruposUsuariosPage params={{grupoUsuario: grupoUsuario}}  />
            </div>
        )
    }
    else{
        return (
            <div> no existe</div>
        )
    }
}