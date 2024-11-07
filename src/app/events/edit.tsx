"use client";

import { api, RouterOutputs } from "~/trpc/react";
import { Button } from "../_components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../_components/ui/dialog";
import { Input } from "../_components/ui/input";
import { toast } from "sonner";

interface EventosProps {
    evento?: RouterOutputs["events"]["list"][0] | null;
}

export default function EditarEvento({ evento }: EventosProps) {
    const { mutateAsync: createEvento } = api.events.create.useMutation();
    const { mutateAsync: updateEvento } = api.events.update.useMutation();

    const [openDialog, setOpenDialog] = useState(false);
    const [type, setType] = useState(evento?.type ?? "");
    const [description, setDescription] = useState(evento?.description ?? "");

    useEffect(() => {
        if(evento) {
            setType(evento.type ?? "");
            setDescription(evento.description ?? "");
        }
    }, [evento])

    async function handleSave() {
        try {
            if (evento) {
                await updateEvento({
                    id: evento.id,
                    type: type ?? "",
                    description: description ?? "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EquipoId: "",
                    ReporteId: "",
                    OTId: "",
                    intervencionId: ""
                });
            } else {
                await createEvento({
                    type: type ?? "",
                    description: description ?? "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EquipoId: "",
                    ReporteId: "",
                    OTId: "",
                    intervencionId: ""
                });
            }
            setOpenDialog(false);
            resetForm();
            toast.success("Evento guardado correctamente");
        } catch (e) {
            console.error("Error al guardar el evento:", e);
            toast.error("Error al crear el evento");
        }
    }
    function resetForm() {
        setDescription("");
        setType("");
    }

    return (
        <div  className="flex justify-center p-10">
            <Button onClick={() => setOpenDialog(true)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                {evento ? "Editar" : "Crear"}
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                            {evento ? `Editar Evento - ${evento.type}` : "Crear Evento"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4"> 
                    <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Tipo de evento..." />
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción..." />
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button 
                        onClick={handleSave}
                        className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                        >
                            {evento ? "Guardar Cambios" : "Crear"}
                        </Button>
                        <Button
                        onClick={() => setOpenDialog(false)}
                        className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400"
                        >
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
