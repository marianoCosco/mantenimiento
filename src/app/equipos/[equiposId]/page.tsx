"use client"

import {api } from "~/trpc/react"

import GruposPage from "./equipos"

export default function GrupoPage(props: { params: { equiposId: string } }) {

    const equipoId  =props.params.equiposId;

    const {data: equipo} = api.equipos.get.useQuery({id: equipoId});
    if(equipo) {
        return (
            <div>
                <p>id: {equipo?.id}</p>
                <GruposPage params={{equipo: equipo}} />
            </div>
        )
    }
    else{
        return (
            <div> no existe esto</div>
        )
    }
}