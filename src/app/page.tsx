"use client";

import { api } from "~/trpc/react";
import { List } from "./_components/ui/list";
import { Button } from "./_components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  //creates
  const {mutateAsync: categoriasCreate} = api.categorias.create.useMutation();
  const {mutateAsync: clientesCreate} = api.clientes.create.useMutation();
  const {mutateAsync: facturasCreate} = api.facturas.create.useMutation();
  const {mutateAsync: imagenesCreate} = api.imagenes.create.useMutation();
  const {mutateAsync: itemFacturaCreate} = api.itemFactura.create.useMutation();
  const {mutateAsync: ofertasCreate} = api.ofertas.create.useMutation();
  const {mutateAsync: prendasCreate} = api.prendas.create.useMutation();
  const {mutateAsync: subcategoriasCreate} = api.subcategorias.create.useMutation();
  //LIST
  const {data: categorias} = api.categorias.list.useQuery();
  const {data: clientes} = api.clientes.list.useQuery();
  const {data: facturas} = api.facturas.list.useQuery();
  const {data: imagenes} = api.imagenes.list.useQuery();
  const {data: itemFactura} = api.itemFactura.list.useQuery();
  const {data: ofertas} = api.ofertas.list.useQuery();
  const {data: prendas} = api.prendas.list.useQuery();
  const {data: subcategorias} = api.subcategorias.list.useQuery();
  
  const router = useRouter();

async function createCategorias() {
  await categoriasCreate({
    nombre: "hola"
  });
  router.refresh();
}
async function createClientes() {
  await clientesCreate({
    nombre: "hola",
    direccion: "hola",
    telefono: "hola",
    ultimaCompra: 1,
    bonus: 1
  });
  router.refresh();
}
async function createFacturas() {
  await facturasCreate({
    cliente_id: 1,
    fecha: new Date(),
    total: 1
  });
  router.refresh();
}
async function createImagenes() {
  await imagenesCreate({
    url: "hola",
    prenda_id: 1
  });
  router.refresh();
}
async function createitemFactura() {
  await itemFacturaCreate({
    factura_id: 1,
    prenda_id: 1,
    cantidad: 1,
    precio: 1
  });
  router.refresh();
}
async function createOfertas() {
  await ofertasCreate({
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    porcentaje: 2,
    prenda_id: 2
  });
  router.refresh();
}
async function createPrendas() {
  await prendasCreate({
    categoria_id: 2,
    subcategoria_id: 2,
    nombre: "hola", 
    precio: 2,
    fecha_ingreso: new Date(),
    es_carrusel: "hola"
  });
  router.refresh();
}
async function createSubcategorias() {
  await subcategoriasCreate({
    categoria_id: 2,
    nombre: "hola"
  });
  router.refresh();
}
  return (
    <div>
      <h1>Home</h1>
      <div className="flex">
        <div>
          <Button onClick={createPrendas}>create prendas</Button>
          <List>
            {prendas? prendas.map((prenda) => (
              <div key={prenda.id}>
                {prenda.nombre}
              </div>)) : null}
          </List>
        </div>
        <div>
          <Button onClick={createCategorias}>create categorias</Button>
          <List>
            {categorias? categorias.map((categorias) => (
              <div key={categorias.id}>
                {categorias.nombre}
              </div>)) : null}
          </List>
        </div>
        <div>
          <Button onClick={createClientes}>create clientes</Button>
          <List>
            {clientes? clientes.map((clientes) => (
              <div key={clientes.id}>
                {clientes.nombre}
              </div>)) : null}
          </List>
        </div>
        <div>
          <Button onClick={createFacturas}>create facturas</Button>
          <List>
            {facturas? facturas.map((facturas) => (
              <div key={facturas.id}>
                {facturas.cliente_id}
              </div>)) : null}
          </List>
        </div>
        <div>
          <Button onClick={createImagenes}>create imagen</Button>
          <List>
            {imagenes? imagenes.map((imagenes) => (
              <div key={imagenes.id}>
                {imagenes.url}
              </div>)) : null}
          </List>
        </div>
        <div>
          <Button onClick={createitemFactura}>create item factura</Button>
          <List>
            {itemFactura? itemFactura.map((itemFactura) => (
              <div key={itemFactura.id}>
                {itemFactura.factura_id}
              </div>)) : null}
          </List>
        </div>
        <div>
          <Button onClick={createOfertas}>create ofertas</Button>
          <List>
            {ofertas? ofertas.map((ofertas) => (
              <div key={ofertas.id}>
                {ofertas.prenda_id}
              </div>)) : null}
          </List>
        </div>
        <div>
          <Button onClick={createSubcategorias}>create subCategorias</Button>
          <List>
            {subcategorias? subcategorias.map((subcategorias) => (
              <div key={subcategorias.id}>
                {subcategorias.categoria_id}
              </div>)) : null}
          </List>
        </div>
      </div>
    </div>
  );
}
