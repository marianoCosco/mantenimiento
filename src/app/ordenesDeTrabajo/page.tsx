"use client";

import { api } from "~/trpc/react";
import { List } from "../_components/ui/list";
import { Button } from "../_components/ui/button";
import { Trash2Icon } from "lucide-react";

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
            <h1 className="flex justify-center mt-10">ordenes De Trabajo</h1>
            <div>
                <List>
                    {ordenesDeTrabajo? ordenesDeTrabajo?.map((odt) => (
                        <div className="border border-black p-10" key={odt.id}>
                            <p>id: {odt.id}</p>
                            <p>title: {odt.title}</p>
                            <div className="flex gap-3">
                                <Button onClick={() => editar(odt.id)}>
                                Actualizar
                                </Button>
                                <Button onClick={() => window.location.href = `/ordenesDeTrabajo/${odt.id}` }>
                                    ver orden de trabajo
                                </Button>
                                <Button onClick={() => borrar(odt.id)}>
                                    <Trash2Icon/>
                                </Button>
                            </div>
                        </div>
                    )): <h1>no existen ordenes de trabajo</h1>}
                </List>
                <div className="flex justify-center p-10">
                    <Button onClick={crear}>
                        Crear ordenes de trabajo
                    </Button>
                </div>
            </div>
        </div>
    );

}