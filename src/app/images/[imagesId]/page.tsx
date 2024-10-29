"use client"

import {api } from "~/trpc/react"

import ImagenIdPage from "./images"

export default function ImagenPage(props: { params: { imagesId: string } }) {

    const imagesId  =props.params.imagesId;
    const {data: imagen} = api.images.get.useQuery({id: imagesId});
    if(imagen) {
        return (
            <div>
                <p>imagen:</p>
                <ImagenIdPage params={{imagesId: imagen}} />
            </div>
        )
    }
    else{
        return (
            <div> no existe imagenes</div>
        )
    }
}