"use client";
import type { RouterOutputs } from "~/trpc/react";
import { api } from "~/trpc/react";
import { Button } from "../../../_components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../_components/ui/dialog";
import { Input } from "../../../_components/ui/input";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
interface IntervencionProps {
    intervenciones?: RouterOutputs["intervenciones"]["get"] | null;
}


export default function EditarIntervenciones({intervenciones}:IntervencionProps) {
    const { mutateAsync: createIntervencion } = api.intervenciones.create.useMutation();
    const { mutateAsync: updateIntervencion } = api.intervenciones.update.useMutation();
    const {data: users} = api.usuarios.list.useQuery();
    const {data: ordenesTrabajo} = api.ordenesDeTrabajo.list.useQuery();
    const queryClient = useQueryClient()
    const [openDialog, setOpenDialog] = useState(false);
    const [createdAt, setCreatedAt] = useState<Date | undefined>( intervenciones?.createdAt ?? new Date())
    const [userId, setUserId] = useState(intervenciones?.userId ?? "")
    const [title, setTitle] = useState(intervenciones?.title ?? "");
    const [descripcion, setDescripcion] = useState(intervenciones?.descripcion ?? "");
    const [ordenTrabajo, setOrdenTrabajo] = useState(intervenciones?.OTid ?? "")

useEffect(() => {
    if (intervenciones) {
        setCreatedAt(intervenciones.createdAt ?? new Date);
        setUserId(intervenciones.userId ?? "")
        setTitle(intervenciones.title ?? "")
        setDescripcion(intervenciones.descripcion ?? "")
        setOrdenTrabajo(intervenciones.OTid ?? "")
    }
}, [intervenciones]);



async function handleSave() {
    try{
        if (intervenciones) {
            await updateIntervencion({
                id: intervenciones.id ?? "",
                userId: userId ?? "",
                title,
                OTid: ordenTrabajo ?? "",
                descripcion,
                createdAt: createdAt ?? new Date(),
            })
            toast.success("Cambios guardados correctamente")
        } else {
            await createIntervencion({
                userId: userId ?? "",
                title,
                OTid: ordenTrabajo ?? "",
                descripcion,
                createdAt: createdAt ?? new Date(),
                });
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
    setUserId("");
    setOrdenTrabajo("")
    setTitle("");
    setDescripcion("");
    setCreatedAt(new Date())
}
return (
    <div className="flex justify-center p-10">
                    <Button onClick={() => setOpenDialog(true)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                        {intervenciones ? "Editar" : "Crear"}
                    </Button>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                    {intervenciones ? "Editar intervencion" + " " + intervenciones.title : "Crear intervencion"}
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
                                
                                <label>Orden de Trabajo</label>
                                <select value={ordenTrabajo} onChange={(e) => setOrdenTrabajo(e.target.value)} required>
                                <option value= "">Selecciona una orden de trabajo</option>
                                    {ordenesTrabajo?.map((user) => (
                                <option key={user.id} value={user.id}>{user.title}</option>
                                    ))}
                                </select>
                                <label>Usuario que hace la intervencion</label>
                                <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                                <option value= "">Selecciona un usuario</option>
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
                                    {intervenciones?.id ? "Guardar cambios" : "Crear"}
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