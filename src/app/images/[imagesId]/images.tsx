"use client";

interface imagen {
    id: string;
    equipo_id: string | null;
    url:  string | null;
    createdAt: Date | null;
    
} 
export default function ImagenIdPage(props: { params: { imagesId: imagen } }) {
    const imagesId  = props.params.imagesId;

    return (
        <div>
            <h1>id:{imagesId?.id}</h1>
            <p>madre mia leo messi</p>
        </div>
    )

}