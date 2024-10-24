"use client";

import { api } from "~/trpc/react";

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
            <h1>reportes</h1>
            <div>
                {reportes? reportes?.map((reporte) => (
                    <div key={reporte.id}>
                        <p>id: {reporte.id}</p>
                        <p>descripcion: {reporte.descripcion}</p>
                        <button onClick={() => borrar(reporte.id)}>borrar</button>
                        <button onClick={() => actualizar(reporte.id)}>actualizar</button>
                    </div>
                )): <h1>no existen reportes</h1>}
                <button onClick={crear}>Crear reportes</button>
            </div>
        </div>
    );

}