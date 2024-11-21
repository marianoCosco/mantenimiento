"use client";

import type { RouterOutputs } from "~/trpc/react";
import CrearIntervenciones from "./edit";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/app/_components/ui/table";

interface OrdenDeTrabajoProps {
    ordenTrabajo?: RouterOutputs["ordenesDeTrabajo"]["get"];
}

export default function OrdenTrabajoIdPage({ ordenTrabajo }: OrdenDeTrabajoProps) {
    return (
        <div className="flex flex-col items-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Orden de Trabajo
                </h2>
                <p className="text-lg font-semibold text-gray-700">Título: {ordenTrabajo?.title}</p>
                {ordenTrabajo?.estado !== "cancelada" && (
                    <CrearIntervenciones ordenDeTrabajoId={ordenTrabajo?.id ?? ""} />
                )}
                <div className="mt-4 border-t border-gray-300 pt-4">
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Descripción:</span> {ordenTrabajo?.descripcion}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Equipo Asignado:</span> {ordenTrabajo?.equipo_id}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Fecha Programada:</span> {ordenTrabajo?.fecha_programada?.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Fecha de Finalización:</span> {ordenTrabajo?.fecha_finalizacion?.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Estado:</span> {ordenTrabajo?.estado}
                    </p>
                </div>
            </div>
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <p className="text-xl font-bold mb-4 text-center text-gray-800">Lista de intervenciones</p>
                <Table className="w-full text-center">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-gray-700 font-semibold p-2">Equipo asignado</TableHead>
                            <TableHead className="text-gray-700 font-semibold p-2">Descripción</TableHead>
                            <TableHead className="text-gray-700 font-semibold p-2">Usuario</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ordenTrabajo?.intervenciones && ordenTrabajo.intervenciones.length > 0 ? (
                            ordenTrabajo.intervenciones.map((intervencion) => (
                                <TableRow key={intervencion.id} className="hover:bg-gray-50">
                                    <TableCell className="p-3 font-medium text-gray-700">{intervencion.title}</TableCell>
                                    <TableCell className="p-3 text-gray-600">{intervencion.descripcion}</TableCell>
                                    <TableCell className="p-3 text-gray-600">{intervencion.userId}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="p-4 text-center text-gray-500">
                                    No existen intervenciones
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
