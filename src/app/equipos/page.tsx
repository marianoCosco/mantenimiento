"use client"

import { api } from "~/trpc/react"
import { Button } from "../_components/ui/button"
import { List } from "../_components/ui/list"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../_components/ui/dialog"
import { Input } from "../_components/ui/input"
export default function Page() {
    const { data: equipos } = api.equipos.list.useQuery()
    const { mutateAsync: crearEquipo } = api.equipos.create.useMutation()
    const { mutateAsync: editarEquipo } = api.equipos.update.useMutation()
    const { mutateAsync: deleteEquipo } = api.equipos.delete.useMutation()
    const [openDialog, setOpenDialog] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [selectedEquipoId, setSelectedEquipoId] = useState("")
    const [name, setName] = useState("")
    const [qrCode, setQrCode] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const openCreateDialog = () => {
        setIsEditMode(false)
        resetForm()  
        setOpenDialog(true)
    }
    interface Equipo {
        id: string;
        name: string | null;
        qr_code: string | null;
        state: string | null;
        last_work: Date | null;
        numberId: number | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date | null;
    }
    const openEditDialog = (equipo: Equipo) => {
        setIsEditMode(true)
        setSelectedEquipoId(equipo.id)
        setName(equipo.name ?? "")       
        setQrCode(equipo.qr_code ?? "")
        setState(equipo.state ?? "")
        setDescription(equipo.description ?? "")
        setOpenDialog(true)     
}
    async function creacion() {
        await crearEquipo({
            name,
            qr_code: qrCode,
            state,
            last_work: new Date(),
            numberId: 1,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        setOpenDialog(false) 
        resetForm() 
    }
    async function editar() {
        if (!selectedEquipoId) return
        await editarEquipo({
            id: selectedEquipoId,
            name,
            qr_code: qrCode,
            state,
            last_work: new Date(),
            numberId: 1,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        setOpenDialog(false)
        resetForm()
    }
    async function borrar(id: string) {
        await deleteEquipo({ id })
    }
    function resetForm() {
        setName("")
        setQrCode("")
        setState("")
        setDescription("")
        setSelectedEquipoId("")
    }

    return (
        <div>
            <h1 className="flex justify-center mt-10">Equipos</h1>
            <div>
                <div className="flex justify-center p-10">
                    <Button onClick={openCreateDialog} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                        Crear equipo
                    </Button>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[500px]">
                            <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                    {isEditMode ? "Editar equipo" : "Crear equipo"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <label className="text-lg text-gray-600 font-medium">Nombre del equipo:</label>
                                <Input
                                    value={name}
                                    placeholder="Nombre..."
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className="text-lg text-gray-600 font-medium">Código QR:</label>
                                <Input
                                    value={qrCode}
                                    placeholder="QR Code..."
                                    onChange={(e) => setQrCode(e.target.value)}
                                />
                                <label className="text-lg text-gray-600 font-medium">Estado:</label>
                                <Input
                                    value={state}
                                    placeholder="Estado..."
                                    onChange={(e) => setState(e.target.value)}
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
                                    onClick={isEditMode ? editar : creacion}
                                    className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                                >
                                    {isEditMode ? "Guardar cambios" : "Crear"}
                                </Button>
                                <Button onClick={() => setOpenDialog(false)} className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400">
                                    Cerrar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <List>
                        {equipos ? (
                            equipos.map((equipo) => (
                                <div className="border border-black p-10" key={equipo.id}>
                                    <p>Equipo: {equipo.name}</p>
                                    <div className="flex gap-3">
                                        <Button onClick={() => openEditDialog(equipo)}>Actualizar</Button>
                                        <Button onClick={() => window.location.href = `/equipos/${equipo.id}`}>
                                            Ver equipo
                                        </Button>
                                        <Button onClick={() => borrar(equipo.id)}>
                                            <Trash2Icon />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>No hay equipos</h1>
                        )}
                    </List>
                </div>
            </div>
        </div>
    )
}
