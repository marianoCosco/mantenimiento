"use client";

import { api } from "~/trpc/react";

export default function Page() {
    const { data: reportes } = api.reportes.list.useQuery();
    const { mutateAsync: createReporte } = api.reportes.create.useMutation();

    async function crear() {
        await createReporte({
            equipoId: "1",
            userId: "1",
            tipoReporte: "intervencion realizada",
            description: "1",
            createdAt: new Date(),
            periodo: "semanal",
        });
    }
    return (
        <div>
            <h1>reportes</h1>
            <div>
                {reportes? reportes?.map((reporte) => (
                    <div key={reporte.id}>
                        <p>id: {reporte.id}</p>
                    </div>
                )): <h1>no existen reportes</h1>}
                <button onClick={crear}>Crear reportes</button>
            </div>
        </div>
    );

}