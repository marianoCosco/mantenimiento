"use client"

import { api } from "~/trpc/react";

export default function Page() {
    const { data: usuarios } = api.usuarios.list.useQuery();
    const { mutateAsync: deleteUsuario } = api.usuarios.delete.useMutation();
    const { mutateAsync: updateUsuario } = api.usuarios.update.useMutation();
    const { data: getUsuario } = api.usuarios.get.useQuery( { id: "1" });
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
            <h1>Usuarios</h1>
            <div>
                {usuarios? usuarios?.map((usuario) => (
                    <div key={usuario.id}>
                        <p>id: {usuario.id}</p>
                        <p>nombre: {usuario.nombre}</p>
                        <p>legajo: {usuario.legajo}</p>
                        <p>email: {usuario.email}</p>
                        <p>telefono: {usuario.telefono}</p>
                        <button onClick={() => deletes(usuario.id)}>Delete</button>
                        <button onClick={() => updates(usuario.id)}>Update</button>
                    </div>
                )): <h1>no existen usuarios</h1>}
                <button onClick={() => creates()}>Create</button>
                
            </div>
        </div>
    )
}