"use client";

import { api } from "~/trpc/react";

export default function Page() {
    const { data: ordenesDeTrabajo } = api.ordenesDeTrabajo.list.useQuery();
    const { mutateAsync: createOrdenDeTrabajo } = api.ordenesDeTrabajo.create.useMutation();

    async function crear() {
        await createOrdenDeTrabajo({
            equipoId: "1",
            userId: "1",
            title: "1",
            description: "1",
            additionarlInfo: "1",
            createdAt: new Date(),
            fechaProgramada: new Date(),
            fechaFinalizado: new Date(),
            estado: "en proceso",
        });
    }
    return (
        <div>
            <h1>ordenes De Trabajo</h1>
            <div>
                {ordenesDeTrabajo? ordenesDeTrabajo?.map((odt) => (
                    <div key={odt.id}>
                        <p>id: {odt.id}</p>
                    </div>
                )): <h1>no existen imagenes</h1>}
                <button onClick={crear}>Crear ordenes de trabajo</button>
            </div>
        </div>
    );

}