"use client";

import { api } from "~/trpc/react";
import { Button } from "../_components/ui/button";
import { List } from "../_components/ui/list";
import { Trash2Icon } from "lucide-react";

export default function Page() {
    const { data: images } = api.images.list.useQuery();
    const { mutateAsync: createImage } = api.images.create.useMutation();
    const {mutateAsync: updateImage} = api.images.update.useMutation();
    const { mutateAsync: deleteImage } = api.images.delete.useMutation();
    const { data: equipos } = api.equipos.list.useQuery();
    
    async function creacion() {
        if(equipos){
            await createImage({
                equipo_id: equipos[0]?.id ?? "",
                url: "1",
                createdAt: new Date(),
            });
        }
    }
    async function updates(id: string) {
        if(equipos){
            await updateImage({
                id: id,
                equipo_id: equipos[0]?.id ?? "",
                url: "1",
                createdAt: new Date(),
            });
        }
    }
    async function deletes(id: string) {
        await deleteImage({
            id: id,
        });
    }
    return (
        <div>
            <h1 className="flex justify-center mt-10">Images</h1>
            <div>
                <List>
                    {images? images?.map((image) => (
                        <div className="border border-black p-10" key={image.id}>
                            <p>id: {image.id}</p>
                            <div className="flex gap-3">
                                <Button onClick={() => updates(image.id)}>
                                Actualizar
                                </Button>
                                <Button onClick={() => window.location.href = `/images/${image.id}`}>
                                    Ver imagen
                                </Button>
                                <Button onClick={() => deletes(image.id)}>
                                    <Trash2Icon/>
                                </Button>
                            </div>
                        </div>
                    )): <h1>no existen imagenes</h1>}
                </List>
                <div className="flex justify-center p-10">
                    <Button onClick={creacion}>
                        Crear Imagen
                    </Button>
                </div>
            </div>
        </div>
    );

}