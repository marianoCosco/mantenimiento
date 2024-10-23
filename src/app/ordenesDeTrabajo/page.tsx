"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function Page() {
    const [id,setId] = useState("")
    const [selectedId, setSelectedId] = useState("");
    const [equiposId, setEquiposId] = useState("");
    const { data: ordenesDeTrabajo } = api.ordenesDeTrabajo.list.useQuery();
    const { mutateAsync: createOrdenDeTrabajo } = api.ordenesDeTrabajo.create.useMutation();
    const { data: get, isLoading, error } = api.ordenesDeTrabajo.get.useQuery({ id: selectedId });
    const { data: getByTeam } = api.ordenesDeTrabajo.getByTeam.useQuery({equipo_id: equiposId});
    const { mutateAsync: upload } = api.ordenesDeTrabajo.upload.useMutation();
    const { mutateAsync: deleteOrdenDeTrabajo } = api.ordenesDeTrabajo.delete.useMutation();
    const { data: equipos } = api.equipos.list.useQuery()


    const handleSubmit = () => {
        console.log({id: id})
        console.log({selectedId:selectedId})
        setSelectedId(id); 
      };
    async function crear() {
        if(equipos){
            await createOrdenDeTrabajo({
                equipo_id: equipos[0]?.id ?? "",
                user_id: "1",
                title: "1",
                description: "1",
                additionarl_info: "1",
                createdAt: new Date(),
                fecha_programada: new Date(),
                fecha_finalizado: new Date(),
                estado: "en proceso",
            });
        }
    }
    
    async function editar() {
        await upload({
            id: "1",
            equipo_id: "1",
            user_id: "1",
            title: "1",
            description: "1",
            additionarl_info: "1",
            createdAt: new Date(),
            fecha_programada: new Date(),
            fecha_finalizado: new Date(),
            estado: "en proceso",
        });
    }
    async function borrar() {
        await deleteOrdenDeTrabajo({ id: "1" });
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
            <div>
                <button onClick={editar}>Editar ordenes de trabajo</button>
            </div>
            <div>
                <button onClick={borrar}>borrar ordenes de trabajo</button>
            </div>
            <div>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={handleSubmit}>Get</button>
            </div>

      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error.message}</div>}

      {get && (
        <div>
          <h2>Orden de Trabajo ID: {get.id}</h2>
          {/* Renderiza otros detalles de la orden de trabajo */}
        </div>
      )}
        </div>
    );

}