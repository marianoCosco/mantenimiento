"use client"

import {api } from "~/trpc/react"

import OrdenTrabajoIdPage from "./ordenTrabajo"

export default function OrdenTrabajoPage(props: { params: { ordenTrabajoId: string } }) {

    const ordenTrabajoId  =props.params.ordenTrabajoId;
    const {data: ordenDeTrabajo} = api.ordenesDeTrabajo.get.useQuery({id: ordenTrabajoId});
    if(ordenDeTrabajo) {
        return (
            <div>
                <p>ordenDeTrabajo:</p>
                <OrdenTrabajoIdPage params={{ordenTrabajoId: ordenDeTrabajo}} />
            </div>
        )
    }
    else{
        return (
            <div> no existe esta orden de trabajo</div>
        )
    }
}