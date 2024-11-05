"use client";

import { api } from "~/trpc/react";
import { Button } from "../_components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../_components/ui/dialog";
import { Input } from "../_components/ui/input";
import { toast } from "sonner";
import { Calendar } from "~/components/ui/calendar";
import { useQueryClient } from "@tanstack/react-query";

export default function EditarOrdenTrabajo(params: {id:string}) {
    
    const id = params.id;
    const {data: orden} = api.ordenesDeTrabajo.get.useQuery({id: id});
    const { mutateAsync: createOrdenDeTrabajo } = api.ordenesDeTrabajo.create.useMutation();
    const { mutateAsync: updateOrdenDeTrabajo } = api.ordenesDeTrabajo.update.useMutation();
    const {data: users} = api.usuarios.list.useQuery();
    const {data: equipos} = api.equipos.list.useQuery();
    const queryClient = useQueryClient()
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState(orden?.title ?? "");
    const [estado, setEstado] = useState<"pendiente" | "en proceso" | "completada" | "cancelada">("pendiente"); 
    const [descripcion, setDescripcion] = useState(orden?.descripcion ?? "");
    const [fechaProgramada, setFechaProgramada] = useState<Date | undefined>(orden?.fecha_programada ?? new Date());
    const [fechaFinalizada, setFechaFinalizada] = useState<Date | undefined>(orden?.fecha_finalizacion ?? new Date()); 
    const [equipoId, setEquipoId] = useState( orden?.equipo?.id ?? "");
    const [userId, setUserId] = useState( orden?.usuario?.id ?? "");

useEffect(() => {
    if (orden) {
        setTitle(orden.title ?? "");
        setEstado(orden.estado ?? "pendiente");
        setDescripcion(orden.descripcion ?? "");
        setFechaProgramada(orden.fecha_programada ?? new Date());
        setFechaFinalizada(orden.fecha_finalizacion ?? new Date());
        setEquipoId(orden.equipo?.id ?? "");
        setUserId(orden.usuario?.id ?? "");
    }
}, [orden]);



async function handleSave() {
    try{
        if (orden) {
            await updateOrdenDeTrabajo({
                id,
                equipo_id: equipoId ?? "",
                userId: userId ?? "",
                title,
                descripcion,
                additional_info: "info adicional",
                createdAt: new Date(),
                fecha_programada: fechaProgramada ? new Date(fechaProgramada) : new Date(),
                fecha_finalizacion: fechaFinalizada ? new Date(fechaFinalizada) : new Date(),
                estado: estado,
            })
            toast.success("Cambios guardados correctamente")
        } else {
            await createOrdenDeTrabajo({
                    equipo_id: equipoId ?? "",
                    userId: userId ?? "",
                    title,
                    descripcion,
                    additional_info: "info adicional",
                    createdAt: new Date(),
                    fecha_programada: fechaProgramada ? new Date(fechaProgramada) : new Date(),
                    fecha_finalizacion: fechaFinalizada ? new Date(fechaFinalizada) : new Date(),
                    estado: estado,});
            toast.success("Cambios guardados correctamente")
        }
        setOpenDialog(false);
        resetForm();
        await queryClient.invalidateQueries();
    } catch (e) {
        console.error("Error al guardar la orden de trabajo:", e);
        toast.error("Error al crear la orden de trabajo");
    }
}


function resetForm() {
    setTitle("");
    setDescripcion("");
    setFechaProgramada(new Date());
    setEquipoId("");
    setUserId("");
}
return (
    <div className="flex justify-center p-10">
                    <Button onClick={() => setOpenDialog(true)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                        {orden ? "Editar" : "Crear"}
                    </Button>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                    {orden ? "Editar Orden de Trabajo" + " " + orden.title : "Crear Orden de Trabajo"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <label className="text-lg text-gray-600 font-medium">Título:</label>
                                <Input
                                    value={title}
                                    placeholder="Título..."
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <label className="text-lg text-gray-600 font-medium">Descripción:</label>
                                <Input
                                    value={descripcion}
                                    placeholder="Descripción..."
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2"
                                />
                                <div className="flex justify-between width-full">
                                    <div>
                                        <label className="text-lg text-gray-600 font-medium">Fecha Programada:</label>
                                        <Calendar 
                                            mode="single"
                                            selected={fechaProgramada}
                                            onSelect={setFechaProgramada}
                                            className="rounded-md border"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-lg text-gray-600 font-medium">Fecha de fecha finalizacion:</label>
                                        <Calendar 
                                            mode="single"
                                            selected={fechaFinalizada}
                                            onSelect={setFechaFinalizada}
                                            className="rounded-md border"
                                            required 
                                        />
                                    </div>
                                </div>
                                <label>Equipo</label>
                                <select value={equipoId} onChange={(e) => setEquipoId(e.target.value)} required>
                                <option value={equipoId}>Selecciona un equipo</option>
                                    {equipos?.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                <label>Usuario</label>
                                <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                                <option value={userId}>Selecciona un usuario</option>
                                    {users?.map((user) => (
                                <option key={user.id} value={user.id}>{user.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <DialogFooter className="flex justify-end gap-2">
                                <Button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                                >
                                    {id ? "Guardar cambios" : "Crear"}
                                </Button>
                                <Button onClick={() => setOpenDialog(false)} className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400">
                                    Cerrar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
)
}