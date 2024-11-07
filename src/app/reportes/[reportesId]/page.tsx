"use client"

import {api } from "~/trpc/react"

import ReporteIdPage from "./reportes"
import { Button } from "~/app/_components/ui/button";
import Link from "next/link";

export default function ReportePage(props: { params: { reportesId: string } }) {

    const reportesId  =props.params.reportesId;
    const {data: reporte} = api.reportes.get.useQuery({id: reportesId});
    if(reporte) {
        return (
            <div>
                <p>reporte:</p>
                <ReporteIdPage params={{reportesId: reporte}} />
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