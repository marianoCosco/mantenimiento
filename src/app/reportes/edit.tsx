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
    SelectValue } from "../_components/ui/select";

interface ReportesProps {
    reporte?: RouterOutputs["reportes"]["get"] | null;
}

export default function EditarReporte({ reporte }: ReportesProps) {
    const { mutateAsync: createReporte } = api.reportes.create.useMutation();
    const { mutateAsync: updateReporte } = api.reportes.upload.useMutation();
    const { data: users } = api.usuarios.list.useQuery();
    const { data: equipos } = api.equipos.list.useQuery();

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [equipoId, setEquipoId] = useState(reporte?.equipo?.id ?? "");
    const [userId, setUserId] = useState(reporte?.usuario?.id ?? "");
    const [descripcion, setDescripcion] = useState(reporte?.descripcion ?? "");
    const [tipoReporte, setTipoReporte] = useState<"intervencion realizada" | "estado del equipo">("estado del equipo");
    const [periodo, setPeriodo] = useState<"semanal" | "mensual" | "anual">("anual");

    useEffect(() => {
        if (reporte) {
            setDescripcion(reporte.descripcion ?? "");
            setEquipoId(reporte.equipo?.id ?? "");
            setUserId(reporte.usuario?.id ?? "");
            setTipoReporte(reporte.tipo_reporte ?? "estado del equipo");
            setPeriodo(reporte.periodo ?? "anual");
        }
    }, [reporte]);

    async function handleSave() {
        try {
            if (!equipoId && !userId) {
                toast.error("Debe seleccionar un equipo o usuario");
                return;
            }

            if (reporte?.id) {
                await updateReporte({
                    id: reporte.id,
                    equipo_id: equipoId,
                    userId: userId,
                    tipo_reporte: tipoReporte,
                    descripcion,
                    createdAt: new Date(),
                    periodo,
                });
            } else {
                await createReporte({
                    equipo_id: equipoId,
                    userId: userId,
                    tipo_reporte: tipoReporte,
                    descripcion,
                    createdAt: new Date(),
                    periodo,
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
        setEquipoId("");
        setUserId("");
        setDescripcion("");
        setTipoReporte("estado del equipo");
        setPeriodo("anual");
    }

    return (
        <div className="flex justify-center p-10">
            <Button onClick={() => setOpenDialog(true)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                {reporte ? "Editar" : "Crear"}
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                            {reporte ? "Editar Reporte" : "Crear Reporte"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <label className="text-lg text-gray-600 font-medium">Descripción:</label>
                        <Input
                            value={descripcion}
                            placeholder="Descripción..."
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        />
                        <div className="flex justify-between width-full">
                            <div>
                                <label className="text-lg text-gray-600 font-medium">Tipo de reporte:</label>
                                <select value={tipoReporte} onChange={(e) => setTipoReporte(e.target.value as "intervencion realizada" | "estado del equipo")} required>
                                    <option value="intervencion realizada">Intervención realizada</option>
                                    <option value="estado del equipo">Estado del equipo</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-lg text-gray-600 font-medium">Periodo:</label>
                                <select value={periodo} onChange={(e) => setPeriodo(e.target.value as "semanal" | "mensual" | "anual")} required>
                                    <option value="semanal">Semanal</option>
                                    <option value="mensual">Mensual</option>
                                    <option value="anual">Anual</option>
                                </select>
                            </div>
                        </div>
                        <label>Equipo</label>
                                <Select value={equipoId} onValueChange={setEquipoId}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="selecione equipo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipos?.map((equipo)=>
                                            <SelectItem key={equipo.id} value={equipo.id}>{equipo.name}</SelectItem>
                                        )}
                                    </SelectContent>
                                    </Select>
                                <label>Usuario</label>
                                <Select value={userId} onValueChange={setUserId}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="selecione usuario..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users?.map((user)=>
                                            <SelectItem key={user.id} value={user.id}>{user.nombre}</SelectItem>
                                        )}
                                    </SelectContent>
                                    </Select>
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button onClick={handleSave} className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700">
                            {reporte ? "Guardar cambios" : "Crear"}
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
