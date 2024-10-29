"use client"

import {api } from "~/trpc/react"

import EventoPage from "./events"

export default function EventosPage(props: { params: { eventsId: string } }) {

    const eventsId  =props.params.eventsId;

    const {data: evento} = api.events.get.useQuery({id: eventsId});
    if(evento) {
        return (
            <div>
                <p>Evento:</p>
                <p>id: {evento?.id}</p>
                <EventoPage params={{evento: evento}} />
            </div>
        )
    }
    else{
        return (
            <div> no existe evento</div>
        )
    }
}