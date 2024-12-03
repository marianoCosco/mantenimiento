import Link from "next/link";

export default function Header(){


    return(
        <div className="top-0 bg-slate-500 fixed h-25 w-screen flex justify-center items-center">
            <div className="flex mt-5 m-12">
                <Link className="text-3xl font-serif font-semibold" href={"/"}>Tienda de Ropa </Link>
            </div>
        </div>
    )
}