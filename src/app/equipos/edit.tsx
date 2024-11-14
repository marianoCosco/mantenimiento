"use client";

import type { RouterOutputs } from "~/trpc/react";
import { api } from "~/trpc/react";
import { Button } from "../_components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../_components/ui/dialog";
import { Input } from "../_components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "../_components/ui/select";
interface EquiposProps {
    equipo?: RouterOutputs["equipos"]["get"] | null;
}

export default function EditarEquipo({ equipo }: EquiposProps) {
    const { mutateAsync: createEquipo } = api.equipos.create.useMutation();
    const { mutateAsync: updateEquipo } = api.equipos.update.useMutation();

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState("")
    const [qrCode, setQrCode] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (equipo) {
            setName(equipo.name ?? "");
            setQrCode(equipo.qr_code ?? "");
            setState(equipo.state ?? "");
            setDescription(equipo.description ?? "");
        }
    }, [equipo]);

    async function handleSave() {
        try {
            if (equipo) {
                await updateEquipo({
                    id: equipo.id,
                    name,
                    qr_code: qrCode,
                    state,
                    last_work: new Date(),
                    numberId: 1,
                    description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            } else {
                await createEquipo({
                    name,
                    qr_code: qrCode,
                    state,
                    last_work: new Date(),
                    numberId: 1,
                    description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
            
            toast.message("Reporte guardado correctamente");
            setOpenDialog(false);
            resetForm();
            router.refresh();
        } catch (e) {
            console.error("Error al guardar el reporte:", e);
            toast.error("Ocurrió un error al guardar el reporte");
        }
    }

    function resetForm() {
        setName("");
        setQrCode("");
        setState("");
        setDescription("");
    }

    return (
        <div className="flex justify-center p-10">
            <Button onClick={() => setOpenDialog(true)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                {equipo ? "Editar" : "Crear"}
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[500px]">
                            <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                    {equipo ? "Editar equipo" : "Crear equipo"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <label className="text-lg text-gray-600 font-medium">Nombre del equipo:</label>
                                <Input
                                    value={name}
                                    placeholder="Nombre..."
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className="text-lg text-gray-600 font-medium">Estado:</label>
                                <Select
                                    value={state}
                                    onValueChange={setState}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="selecione un estado..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Disponible">Disponible</SelectItem>
                                        <SelectItem value="En uso">En uso</SelectItem>
                                        <SelectItem value="Averiada">Averiada</SelectItem>
                                        <SelectItem value="En reparación">En reparación</SelectItem>
                                        <SelectItem value="Obsoleta">Obsoleta</SelectItem>
                                    </SelectContent>
                                </Select>
                                <label className="text-lg text-gray-600 font-medium">Código QR:</label>
                                <Input
                                    value={qrCode}
                                    placeholder="QR Code..."
                                    onChange={(e) => setQrCode(e.target.value)}
                                />
                                <label className="text-lg text-gray-600 font-medium">Descripción:</label>
                                <Input
                                    value={description}
                                    placeholder="Descripción..."
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <DialogFooter className="flex justify-end gap-2">
                                <Button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                                >
                                    {equipo ? "Guardar cambios" : "Crear"}
                                </Button>
                                <Button onClick={() => setOpenDialog(false)} className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400">
                                    Cerrar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
        </div>
    );
}
