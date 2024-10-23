"use client";

import { api } from "~/trpc/react";

export default function Page() {
    const { data: images } = api.images.list.useQuery();
    const { mutateAsync: createImage } = api.images.create.useMutation();
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
    async function deletes(id: string) {
        await deleteImage({
            id: id,
        });
    }
    return (
        <div>
            <h1>Images</h1>
            <div>
                {images? images?.map((image) => (
                    <div key={image.id}>
                        <p>id: {image.id}</p>
                        <button onClick={() => deletes(image.id)}>Delete</button>
                    </div>
                )): <h1>no existen imagenes</h1>}
                <button onClick={creacion}>Crear Imagen</button>
            </div>
        </div>
    );

}