"use client"

import {api } from "~/trpc/react"

import ReporteIdPage from "./reportes"
import { Link } from "lucide-react";
import { Button } from "react-day-picker";

export default function ReportePage(props: { params: { reportesId: string } }) {

    const reportesId  =props.params.reportesId;
    const {data: reporte} = api.reportes.get.useQuery({id: reportesId});
    if(reporte) {
        return (
            <div>
                <p>reporte:</p>
                <ReporteIdPage params={{reportesId: reporte}} />
                <Button >
                    <Link href={`/reportes/${ reportesId }/intervenciones}`}>
                        ver intervenciones
                    </Link>
                </Button>
            </div>
        )
    }
    else{
        return (
            <div> no existe reportes</div>
        )
    }
}