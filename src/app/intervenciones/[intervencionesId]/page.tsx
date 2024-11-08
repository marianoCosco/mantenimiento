"use client"

import {api } from "~/trpc/react"

import IntervencionesIdPage from "./intervencionesId"

export default function ReportePage(props: { params: { intervencionesId: string } }) {

    const intervencionId  =props.params.intervencionesId;
    const {data: intervencion} = api.intervenciones.get.useQuery({id: intervencionId});
    if(intervencion) {
        return (
            <div>
                <p>intervencion:</p>
                <IntervencionesIdPage params={{intervencionesId: intervencionId }} />
            </div>
        )
    }
    else{
        return (
            <div> no existe reportes</div>
        )
    }
}