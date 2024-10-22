"use client"

import Link from "next/link";
export default function Home() {

return (
    <div>
      <div> hola maxi</div>
      <div> 
        <Link href="/equipos">equipos</Link>
      </div>
      <div>
        <Link href="/events">events</Link>
      </div>
      <div> 
        <Link href="/images">images</Link>
      </div>
      <div>
        <Link href="/ordenesDeTrabajo">ordenesDeTrabajo</Link>
      </div>
      <div>
        <Link href="/reportes">reportes</Link>
      </div>
    </div>
  );
}