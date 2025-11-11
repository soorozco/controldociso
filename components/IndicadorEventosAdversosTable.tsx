

import React from 'react';
import { RegistroEventoAdverso } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface IndicadorEventosAdversosTableProps {
    registros: RegistroEventoAdverso[];
}

// Helper to get descriptive labels from numeric/short codes
const getSexoLabel = (value: string) => {
    switch (value) {
        case '1': return 'Masculino';
        case '2': return 'Femenino';
        default: return value;
    }
};

const getTurnoLabel = (value: string) => {
    switch (value) {
        case '1': return 'Matutino';
        case '2': return 'Vespertino';
        case '3': return 'Nocturno';
        case '4': return 'Jornada Acumulada';
        default: return value;
    }
};

const getTipoIncidenteLabel = (value: string) => {
    switch (value) {
        case 'A': return 'De medicación';
        case 'B': return 'Expediente clínico';
        case 'C': return 'Infección A.A.M.';
        case 'D': return 'Hemoderivados';
        case 'E': return 'Nutrición';
        case 'F': 'Dispositivos y Equipos';
        case 'G': return 'Procedimientos quirúrgicos';
        case 'H': return 'Caídas';
        case 'I': return 'Patología';
        case 'J': return 'Otro';
        default: return value;
    }
};

const getGravedadLabel = (value: string) => {
    switch (value) {
        case 'A': return 'Sin daño (Cuasifalla)';
        case 'B': return 'Daño leve';
        case 'C': return 'Daño moderado';
        case 'D': return 'Daño grave';
        case 'E': return 'Muerte';
        default: return value;
    }
};


export const IndicadorEventosAdversosTable: React.FC<IndicadorEventosAdversosTableProps> = ({ registros }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Sexo / Edad</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Área</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Turno</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Tipo Incidente</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Gravedad</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {registros.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-3 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">No hay registros de eventos adversos.</td>
                        </tr>
                    ) : (
                        registros.map((reg) => (
                            <tr key={reg.id}>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fechaea}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{getSexoLabel(reg.sexo)} / {reg.edad}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                    {reg.lugarea === '19' ? reg.lugareaotro : 
                                     reg.lugarea === '1' ? 'Archivo Clínico' :
                                     reg.lugarea === '2' ? 'Caja' :
                                     reg.lugarea === '3' ? 'Cirugía' :
                                     reg.lugarea === '4' ? 'Enfermería' :
                                     reg.lugarea === '5' ? 'Estacionamiento' :
                                     reg.lugarea === '6' ? 'Farmacia' :
                                     reg.lugarea === '7' ? 'Ginecología/Obstetricia' :
                                     reg.lugarea === '8' ? `Hosp: ${reg.areaHospitalizacion || ''} - ${reg.habitacion || ''}` :
                                     reg.lugarea === '9' ? 'Imagenología y Rayos X' :
                                     reg.lugarea === '10' ? 'Laboratorio' :
                                     reg.lugarea === '11' ? 'Medicina Interna' :
                                     reg.lugarea === '12' ? 'Módulo de Incapacidades' :
                                     reg.lugarea === '13' ? 'Pediatría' :
                                     reg.lugarea === '14' ? 'Recepción' :
                                     reg.lugarea === '15' ? 'Trabajo Social' :
                                     reg.lugarea === '16' ? 'Urgencias' :
                                     reg.lugarea === '20' ? 'Consulta externa' :
                                     reg.lugarea === '18' ? 'Vigilancia' :
                                     reg.lugarea === '21' ? 'Unid. C.I. Adultos' :
                                     reg.lugarea === '22' ? 'Unid. C.I. Pediátricos' :
                                     reg.lugarea === '23' ? 'Unid. C.I. Neonatales' :
                                     ''
                                    }
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{getTurnoLabel(reg.turnoea)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{getTipoIncidenteLabel(reg.tipoincidente)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{getGravedadLabel(reg.gravedad)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                    <button /* onClick={() => onView(reg)} */ className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200">Ver Detalles</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};