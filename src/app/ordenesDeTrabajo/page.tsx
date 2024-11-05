"use client";

import { api } from "~/trpc/react";
import { List } from "../_components/ui/list";
import { Button } from "../_components/ui/button";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import EditarOrdenTrabajo from "./edit";
import { useQueryClient } from "@tanstack/react-query";

export default function Page() {
    const { data: ordenesDeTrabajo } = api.ordenesDeTrabajo.list.useQuery();
    const { mutateAsync: deleteOrdenDeTrabajo } = api.ordenesDeTrabajo.delete.useMutation();
    
    const queryClient = useQueryClient()

    async function borrar(id: string) {
        await deleteOrdenDeTrabajo({ id });
        toast.success("Orden borrada correctamente")
        await queryClient.invalidateQueries();
    }


    return (
        <div>
            <h1 className="flex justify-center mt-10">Órdenes de Trabajo</h1>
                <EditarOrdenTrabajo id= {""} />
            <div>
                <List>
                    {ordenesDeTrabajo ? (
                        ordenesDeTrabajo.map((orden) => (
                            <div className="border border-black p-10" key={orden.id}>
                                <p>equipo: {orden.equipo?.name}</p>
                                <p>Título: {orden.title}</p>
                                <p>Fecha Programada: {orden.fecha_programada?.toLocaleDateString()}</p>	
                                <p>Estado: {orden.estado}</p>
                                <p>usuario: {orden.usuario?.nombre}</p>
                                <div className="flex gap-4 items-center p-2 bg-gray-100 rounded-lg shadow-sm">
                                    <EditarOrdenTrabajo id= {orden.id} />
                                    <Button asChild>
                                        <Link href={`/ordenesDeTrabajo/${orden.id}`}>
                                            Ver orden de trabajo
                                        </Link>
                                    </Button>
                                    <Button onClick={() => borrar(orden.id)}>
                                        <Trash2Icon />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No existen órdenes de trabajo</h1>
                    )}
                </List>
            </div>
        </div>
    );
}
