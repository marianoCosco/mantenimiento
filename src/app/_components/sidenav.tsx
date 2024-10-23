import Link from "next/link";
import { useState } from "react";
export default function Sidenav() {
    const listaDeStrings = [
        { esp: "equipos", eng: "equipos" },
        { esp: "events", eng: "events" },
        { esp: "images", eng: "images" },
        { esp: "ordenesDeTrabajo", eng: "ordenesDeTrabajo"},
        { esp: "reportes", eng: "reportes"}
    ];

    return (
        <div className="left-0 top-20 bg-slate-500 fixed h-screen w-1/10">
            <h1>Menu</h1>
            <div className="">
                <ul className="m-5">
                    {listaDeStrings.map((item) => (
                        <li key={item.esp} className="mt-5">
                            <Link href={`/${item.esp}`}>
                                <h1>{item.eng}</h1>
                            </Link>
                            <div className="h-4px w-full bg-black"></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}