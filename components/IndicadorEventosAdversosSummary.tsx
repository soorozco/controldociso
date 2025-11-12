

import React, { useMemo } from 'react';
import { RegistroEventoAdverso } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorEventosAdversosSummaryProps {
    onClose: () => void;
    registros: RegistroEventoAdverso[];
}

const getGravedadColor = (gravedad: string) => {
    switch (gravedad) {
        case 'A': return 'bg-green-500'; // Sin daño (Cuasifalla)
        case 'B': return 'bg-yellow-400'; // Daño leve
        case 'C': return 'bg-orange-500'; // Daño moderado
        case 'D': return 'bg-red-600';   // Daño grave
        case 'E': return 'bg-red-800';   // Muerte
        default: return 'bg-gray-400';
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

const getTipoIncidenteLabel = (value: string) => {
    switch (value) {
        case 'A': return 'De medicación';
        case 'B': return 'Expediente clínico';
        case 'C': return 'Infección A.A.M.';
        case 'D': return 'Hemoderivados';
        case 'E': return 'Nutrición';
        case 'F': return 'Dispositivos y Equipos Médicos';
        case 'G': return 'Procedimientos quirúrgicos';
        case 'H': return 'Caídas';
        case 'I': return 'Patología';
        case 'J': return 'Otro tipo de incidente';
        default: return value;
    }
};


export const IndicadorEventosAdversosSummary: React.FC<IndicadorEventosAdversosSummaryProps> = ({ onClose, registros }) => {

    const summary = useMemo(() => {
        const total = registros.length;
        if (total === 0) {
            return {
                totalRegistros: 0,
                gravedadDistribution: {},
                incidenteTypeDistribution: {},
                evitablePercentage: 0,
            };
        }

        const gravedadDistribution: Record<string, number> = {};
        const incidenteTypeDistribution: Record<string, number> = {};
        let evitableCount = 0;

        // FIX: Rely on type inference for the forEach callback parameter to ensure its properties are correctly typed for arithmetic operations.
        registros.forEach(reg => {
            gravedadDistribution[reg.gravedad] = (gravedadDistribution[reg.gravedad] || 0) + 1;
            incidenteTypeDistribution[reg.tipoincidente] = (incidenteTypeDistribution[reg.tipoincidente] || 0) + 1;
            if (reg.evitado === 'SI') {
                evitableCount++;
            }
        });

        const evitablePercentage = (evitableCount / total) * 100;

        return {
            totalRegistros: total,
            gravedadDistribution,
            incidenteTypeDistribution,
            evitablePercentage,
        };
    }, [registros]);

    const sortedGravedad = Object.entries(summary.gravedadDistribution)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)); // Sort A, B, C, D, E

    const sortedIncidentes = Object.entries(summary.incidenteTypeDistribution)
        .sort(([, countA], [, countB]) => countB - countA); // Sort by count descending

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Registro de Eventos Adversos (Total: {summary.totalRegistros})</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Distribución por Gravedad</h3>
                        {summary.totalRegistros === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">No hay datos para mostrar.</p>
                        ) : (
                            <div className="space-y-3">
                                {sortedGravedad.map(([gravedadKey, count]) => (
                                    <div key={gravedadKey} className="flex items-center">
                                        <div className="w-40 text-sm text-gray-600 dark:text-gray-400 pr-4">{getGravedadLabel(gravedadKey)}</div>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                                            <div
                                                className={`${getGravedadColor(gravedadKey)} h-6 rounded-full flex items-center justify-end px-2 text-white text-xs font-bold`}
                                                style={{ width: `${(count / summary.totalRegistros) * 100}%` }} 
                                            >
                                                {count} ({( (count / summary.totalRegistros) * 100).toFixed(1)}%)
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Distribución por Tipo de Incidente</h3>
                        {summary.totalRegistros === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">No hay datos para mostrar.</p>
                        ) : (
                            <div className="space-y-3">
                                {sortedIncidentes.map(([incidenteKey, count]) => (
                                    <div key={incidenteKey} className="flex items-center">
                                        <div className="w-60 text-sm text-gray-600 dark:text-gray-400 pr-4 truncate" title={getTipoIncidenteLabel(incidenteKey)}>{getTipoIncidenteLabel(incidenteKey)}</div>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                                            <div
                                                className="bg-blue-600 h-6 rounded-full flex items-center justify-end px-2 text-white text-xs font-bold"
                                                style={{ width: `${(count / summary.totalRegistros) * 100}%` }}
                                            >
                                                {count} ({( (count / summary.totalRegistros) * 100).toFixed(1)}%)
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Eventos Evitables</h3>
                        {summary.totalRegistros === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">No hay datos para mostrar.</p>
                        ) : (
                            <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="relative w-24 h-24">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <circle
                                            className="text-gray-200 dark:text-gray-600"
                                            stroke="currentColor"
                                            strokeWidth="3.5"
                                            fill="transparent"
                                            r="15.9155"
                                            cx="18"
                                            cy="18"
                                        />
                                        <circle
                                            className="text-orange-500"
                                            stroke="currentColor"
                                            strokeWidth="3.5"
                                            strokeDasharray={`${summary.evitablePercentage} 100`}
                                            strokeLinecap="round"
                                            fill="transparent"
                                            r="15.9155"
                                            cx="18"
                                            cy="18"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-gray-800 dark:text-white">{summary.evitablePercentage.toFixed(0)}%</span>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p><span className="font-bold">{(summary.evitablePercentage / 100 * summary.totalRegistros).toFixed(0)} de {summary.totalRegistros}</span> eventos pudieron haberse evitado.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-500">Cerrar</button>
                </div>
            </div>
        </div>
    );
};