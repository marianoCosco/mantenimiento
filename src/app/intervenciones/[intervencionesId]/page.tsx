"use client"

import {api } from "~/trpc/react"

import IntervencionIdPage from "./intervenciones"

export default function IntervencionPage(props: { params: { intervencionesId: string } }) {

    const intervencionesId  =props.params.intervencionesId;
    const {data: intervencion} = api.intervenciones.get.useQuery({id: intervencionesId});
    if(intervencion) {
        return (    
            <div>
                <p>intervencion:</p>
                <IntervencionIdPage params={{intervencionesId: intervencion}} />
            </div>
        )
    }
    else{
        return (
            <div> no existe esta intervencion</div>
        )
    }
}