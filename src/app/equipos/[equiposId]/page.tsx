"use client"

import {api } from "~/trpc/react"

import GruposPage from "./equipos"

export default function GrupoPage(props: { params: { gruposId: string } }) {

    const gruposId  =props.params.gruposId;

    const {data: grupo} = api.equipos.get.useQuery({id: gruposId});
    console.log({algo:gruposId})
    if(grupo) {
        return (
            <div>
                <p>id: {grupo?.id}</p>
            </div>
        )
    }
    else{
        return (
            <div> no existe esto</div>
        )
    }
}