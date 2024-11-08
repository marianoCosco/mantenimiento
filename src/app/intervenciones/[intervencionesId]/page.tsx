"use client"

import {api } from "~/trpc/react"

import IntervencionesIdPage from "./intervencionesId"
import { Button } from "~/app/_components/ui/button";
import Link from "next/link";

export default function ReportePage(props: { params: { intervencionesId: string } }) {

    const reportesId  =props.params.intervencionesId;
    const {data: intervencion} = api.intervenciones.get.useQuery({id: reportesId});
    if(intervencion) {
        return (
            <div>
                <p>intervencion:</p>
                <IntervencionesIdPage params={{intervencionesId: intervencion}} />
                <div className="mt-4">
                    <Button >
                        <Link href={`/reportes/${reportesId}/intervenciones`}>
                            crear una intervenciones
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }
    else{
        return (
            <div> no existe reportes</div>
        )
    }
}