"use client";

import { Trash2Icon } from "lucide-react";
import { api } from "~/trpc/react";
import { List } from "../_components/ui/list";
import { Button } from "../_components/ui/button";

export default function Page() {
    const { data: reportes } = api.reportes.list.useQuery();
    const { mutateAsync: createReporte } = api.reportes.create.useMutation();
    const { mutateAsync: deleteReporte } = api.reportes.delete.useMutation();
    const { mutateAsync: updateReporte } = api.reportes.upload.useMutation();
    const { data:equipos } = api.equipos.list.useQuery();
    const { data:users } = api.usuarios.list.useQuery();
    async function crear() {
        if(equipos && users) {
            await createReporte({
                equipo_id: equipos[0]?.id ?? "",
                user_id: users[0]?.id ?? "",
                tipo_reporte: "intervencion realizada",
                descripcion: "1",
                createdAt: new Date(),
                periodo: "semanal",
            });
        }
    }

    async function borrar(id: string) {
        await deleteReporte({id: id});
    }
    async function actualizar(id: string) {
        if(equipos && users) {
            await updateReporte({
                id: id,
                equipoId: equipos[0]?.id ?? "",
                userId: users[0]?.id ?? "",
                tipoReporte: "intervencion realizada",
                descripcion: "2",
                createdAt: new Date(),
                periodo: "semanal",
            });
        }
    }
    return (
        <div>
            <h1 className="flex justify-center mt-10">Reportes</h1>
            <div>
                <List>
                    {reportes? reportes?.map((reporte) => (
                        <div className="border border-black p-10" key={reporte.id}>
                            <p>id: {reporte.id}</p>
                            <p>descripcion: {reporte.descripcion}</p>
                            <div className="flex gap-3">
                                <Button onClick={() => actualizar(reporte.id)}>
                                    actualizar
                                </Button>
                                <Button onClick={() => window.location.href = `/reportes/${reporte.id}`} >
                                    ver reporte
                                </Button>
                                <Button onClick={() => borrar(reporte.id)}>
                                    <Trash2Icon/>
                                </Button>
                            </div>
                        </div>
                    )): <h1>no existen reportes</h1>}
                </List>
                <div className="flex justify-center p-10">
                    <Button onClick={crear} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                        Crear reportes
                    </Button>
                </div>
            </div>
        </div>
    );

}