"use client"

import {api } from "~/trpc/react"

import ReporteIdPage from "./reportes"

export default function ReportePage(props: { params: { reportesId: string } }) {

    const reportesId  =props.params.reportesId;
    const {data: reporte} = api.reportes.get.useQuery({id: reportesId});
    if(reporte) {
        return (
            <div>
                <p>reporte:</p>
                <ReporteIdPage params={{reportesId: reporte}} />
            </div>
        )
    }
    else{
        return (
            <div> no existe reportes</div>
        )
    }
}