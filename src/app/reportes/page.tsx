/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { Trash2Icon } from "lucide-react";
import { api } from "~/trpc/react";
import { List } from "../_components/ui/list";
import { Button } from "../_components/ui/button";
import EditarReporte from "./edit";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {
    
    const queryClient = useQueryClient()
    const { data: reportes } = api.reportes.list.useQuery();
    const { mutateAsync: deleteReporte } = api.reportes.delete.useMutation();

    async function borrar(id: string) {
        await deleteReporte({id: id});
        await queryClient.invalidateQueries();
    }
    console.log({reporte:reportes})
    return (
        <div>
            <h1 className="flex justify-center mt-10">Reportes</h1>
                <EditarReporte reporte={null} />
            <div>
                <div className="flex justify-center p-10">
                    <List>
                        {reportes? reportes?.map((reporte) => (
                            <div className="border border-black p-10" key={reporte.id}>
                                <p>descripcion: {reporte.descripcion}</p>
                                <p>equipo: {reporte.equipo?.name ?? "-"}</p>
                                <p>fecha: {reporte.createdAt?.toLocaleDateString()}</p>
                                <p>ot: {reporte.tipo_reporte}</p>
                                <div className="flex gap-4 items-center p-2 bg-gray-100 rounded-lg shadow-sm">
                                    <EditarReporte reporte={reporte} />
                                    <Button asChild >
                                        <Link href={`/reportes/${reporte.id}`}>
                                            ver reporte
                                        </Link>
                                    </Button>
                                    <Button onClick={() => borrar(reporte.id)}>
                                        <Trash2Icon/>
                                    </Button>
                                </div>
                            </div>
                        )): <h1>no existen reportes</h1>}
                    </List>
                </div>
            </div>
        </div>
    );
}