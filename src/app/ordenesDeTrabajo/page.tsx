"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function Page() {
    const { data: ordenesDeTrabajo } = api.ordenesDeTrabajo.list.useQuery();
    const { mutateAsync: createOrdenDeTrabajo } = api.ordenesDeTrabajo.create.useMutation();
    const { mutateAsync: upload } = api.ordenesDeTrabajo.upload.useMutation();
    const { mutateAsync: deleteOrdenDeTrabajo } = api.ordenesDeTrabajo.delete.useMutation();
    const { data: equipos } = api.equipos.list.useQuery()
    const { data: users } = api.usuarios.list.useQuery()


    async function crear() {
        if(equipos && users) {
            await createOrdenDeTrabajo({
                equipo_id: equipos[0]?.id ?? "",
                userId: users[0]?.id ?? "",
                title: "1",
                descripcion: "1",
                additional_info: "1",
                createdAt: new Date(),
                fecha_programada: new Date(),
                fecha_finalizacion: new Date(),
                estado: "en proceso",
            });
        }
    }
    
    async function editar(id: string) {
        if(equipos && users) {
            await upload({
                id: id,
                equipo_id: equipos[0]?.id ?? "",
                userId: users[0]?.id ?? "",
                title: "2",
                descripcion: "1",
                additional_info: "1",
                createdAt: new Date(),
                fecha_programada: new Date(),
                fecha_finalizacion: new Date(),
                estado: "en proceso",
            });
        }
    }
    async function borrar(id: string) {
        await deleteOrdenDeTrabajo({ id });
    }
    return (
        <div>
            <h1>ordenes De Trabajo</h1>
            <div>
                {ordenesDeTrabajo? ordenesDeTrabajo?.map((odt) => (
                    <div key={odt.id}>
                        <p>id: {odt.id}</p>
                        <p>title: {odt.title}</p>
                        <div className="flex gap-3">
                            <button onClick={() => editar(odt.id)}>Editar</button>
                            <button onClick={() => borrar(odt.id)}>borrar</button>
                            <button onClick={() => window.location.href = `/ordenesDeTrabajo/${odt.id}` }>ver orden de trabajo</button>
                        </div>
                    </div>
                )): <h1>no existen imagenes</h1>}
                <button onClick={crear}>Crear ordenes de trabajo</button>
            </div>
        </div>
    );

}