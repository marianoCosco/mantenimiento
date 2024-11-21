"use client";
import { api } from "~/trpc/react";
import { Button } from "~/app/_components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/app/_components/ui/dialog";
import { Input } from "~/app/_components/ui/input";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";



export default function CrearIntervenciones(params :{ordenDeTrabajoId: string}) {
    const { mutateAsync: createIntervencion } = api.intervenciones.create.useMutation();
    const {data: users} = api.usuarios.list.useQuery();
    
    const queryClient = useQueryClient()

    
    const [openDialog, setOpenDialog] = useState(false);
    const [type, setType] = useState<"Finalización" | "Cancelación" | "Avance">("Avance");
    const [createdAt, setCreatedAt] = useState<Date | undefined>( new Date())
    const [userId, setUserId] = useState( "")
    const [title, setTitle] = useState( "");
    const [descripcion, setDescripcion] = useState("");


async function handleSave() {
    try{
        
            await createIntervencion({
                type: type,
                userId: userId ?? "",
                title,
                OTid: params.ordenDeTrabajoId,
                descripcion,
                createdAt: createdAt ?? new Date(),
                });
            toast.success("Cambios guardados correctamente")
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
    setTitle("");
    setDescripcion("");
    setCreatedAt(new Date())
}
return (
    <div className="flex justify-center p-10">
                    <Button onClick={() => setOpenDialog(true)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                        Crear intervencion
                    </Button>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                    Crear intervencion
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
                                <label>Usuario que hace la intervencion</label>
                                <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                                <option value= "">Selecciona un usuario</option>
                                    {users?.map((user) => (
                                <option key={user.id} value={user.id}>{user.nombre}</option>
                                    ))}
                                </select>
                                <select value={type} onChange={(e) => setType(e.target.value as "Avance" | "Cancelación" | "Finalización")}>
                                    <option value="Finalización">Finalizacion</option>
                                    <option value="Cancelación">Cancelación</option>
                                    <option value="Avance">Avance</option>
                                </select>
                            </div>
                            <DialogFooter className="flex justify-end gap-2">
                                <Button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                                >
                                    Crear
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