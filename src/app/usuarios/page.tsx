"use client"

import { api } from "~/trpc/react";
import { List } from "../_components/ui/list";
import { Button } from "../_components/ui/button";
import { Trash2Icon } from "lucide-react";

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
            <h1 className="flex justify-center mt-10">Usuarios:</h1>
            <div>
                <List>
                    {usuarios? usuarios?.map((usuario) => (
                        <div className="border border-black p-10" key={usuario.id}>
                            <p>nombre: {usuario.nombre}</p>
                            <div className="flex gap-3">
                            <Button onClick={() => updates(usuario.id)}>
                                Actualizar
                            </Button>
                            <Button onClick={() => window.location.href = `/usuarios/${usuario.id}`}>
                                ver usuario
                            </Button>
                            <Button onClick={() => deletes(usuario.id)}>
                                <Trash2Icon />
                            </Button>
                            </div>
                        </div>
                    )): <h1>no existen usuarios</h1>}
                </List>
                
            </div>
            <div className="flex justify-center p-10">
                <Button onClick={() => creates()} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                    Crear usuario
                </Button>
            </div>
        </div>
    )
}