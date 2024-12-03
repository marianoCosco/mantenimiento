import Link from "next/link";
export default function Sidenav() {
    const listaDeStrings = [
        { esp: "categorias", eng: "categorias" },
        { esp: "clientes", eng: "clientes" },
        { esp: "facturas", eng: "facturas" },
        { esp: "prendas", eng: "prendas" },
        { esp: "ofertas", eng: "ofertas" },
        { esp: "subcategorias", eng: "subcategorias" },
    ];
    // no inclui imagenes, itemFactura

    return (
        <div className="fixed top-20 left-0 w-full h-16 bg-slate-500 flex justify-center px-8">
            <ul className="flex space-x-8">
                {listaDeStrings.map((item) => (
                    <li key={item.eng} className="mt-5">
                        <Link href={`/${item.eng}`} className="text-black hover:underline">
                            <h1>{item.esp}</h1>
                        </Link>
                        <div className="h-4px w-full bg-black"></div>
                    </li>
                ))}
            </ul>        
        </div>
    );
}