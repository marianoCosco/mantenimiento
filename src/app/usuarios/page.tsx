"use client"

import { api } from "~/trpc/react";
import { ListTile } from "../_components/ui/list";

export default function Page() {
    const { data: usuarios } = api.usuarios.list.useQuery();
    const { mutateAsync: deleteUsuario } = api.usuarios.delete.useMutation();
    const { mutateAsync: updateUsuario } = api.usuarios.update.useMutation();
    const { mutateAsync: createUsuario } = api.usuarios.create.useMutation();
    
    async function deletes(id: string) {
        await deleteUsuario({
            id: id
        });
    }

    async function updates(id: string) {    
        await updateUsuario({
            id: id,
            nombre: "2",
            legajo: "1",    
            email: "1",
            telefono: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async function creates() {
        await createUsuario({
            nombre: "1",
            legajo: "1",
            email: "1", 
            telefono: "1",
            createdAt: new Date(),  
            updatedAt: new Date(),
        }); 
    }
    
    
    return (
        <div>
            <h1>Usuarios:</h1>
            <div>
                {usuarios? usuarios?.map((usuario) => (
                    <div key={usuario.id}>
                        <p>nombre: {usuario.nombre}</p>
                        <div className="flex gap-3">
                        <button onClick={() => deletes(usuario.id)}>Delete</button>
                        <button onClick={() => updates(usuario.id)}>Update</button>
                        <button onClick={() => window.location.href = `/usuarios/${usuario.id}`}>ver usuario</button>
                        </div>
                    </div>
                )): <h1>no existen usuarios</h1>}
                
            </div>
            <button onClick={() => creates()}>Create</button>
        </div>
    )
}