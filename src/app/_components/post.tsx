"use client";

import { useRouter } from "next/navigation";
export function BotonAtras() {
  const router = useRouter()
  return (
  <button onClick={() => router.back()}>volver atras</button>
  );
}
