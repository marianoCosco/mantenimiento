"use client";

import { api } from "~/trpc/react";

export default function Page() {
    const { data: images } = api.images.getByTeamId.useMutation();
    const { mutateAsync: createImage } = api.images.create.useMutation();
    const { mutateAsync: deleteImage } = api.images.delete.useMutation();

    async function creacion() {
        await createImage({
            equipo_id: "1",
            url: "1",
            createdAt: new Date(),
        });
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