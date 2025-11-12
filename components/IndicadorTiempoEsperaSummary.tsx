

import React, { useMemo } from 'react';
import { RegistroTiempoEspera } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorTiempoEsperaSummaryProps {
    onClose: () => void;
    registros: RegistroTiempoEspera[];
}

const SummaryStat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
        <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
    </div>
);

export const IndicadorTiempoEsperaSummary: React.FC<IndicadorTiempoEsperaSummaryProps> = ({ onClose, registros }) => {
    
    const stats = useMemo(() => {
        if (registros.length === 0) {
            return { min: 0, max: 0, avg: 0, total: 0, totalMinutos: 0, ranges: {
                '0-15 min': 0,
                '16-30 min': 0,
                '31-45 min': 0,
                '46+ min': 0,
            }};
        }
        
        const tiempos = registros.map(r => r.minutosEspera);
        const total = registros.length;
        const min = Math.min(...tiempos);
        const max = Math.max(...tiempos);
        const totalMinutos = tiempos.reduce((acc, t) => acc + t, 0);
        const avg = total > 0 ? Math.round(totalMinutos / total) : 0;

        const ranges: Record<string, number> = {
            // FIX: Rely on type inference for the filter callback parameter to ensure its properties are correctly typed for arithmetic comparisons.
            '0-15 min': registros.filter(r => r.minutosEspera >= 0 && r.minutosEspera <= 15).length,
            '16-30 min': registros.filter(r => r.minutosEspera >= 16 && r.minutosEspera <= 30).length,
            '31-45 min': registros.filter(r => r.minutosEspera >= 31 && r.minutosEspera <= 45).length,
            '46+ min': registros.filter(r => r.minutosEspera >= 46).length,
        };

        return { min, max, avg, total, totalMinutos, ranges };
    }, [registros]);
    
    const rangeData = Object.entries(stats.ranges).map(([label, count]) => ({
        label,
        count,
        percentage: stats.total > 0 ? (count / stats.total) * 100 : 0
    }));
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Tiempo de Espera (Concentrado)</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SummaryStat label="Tiempo Mínimo" value={`${stats.min} min`} />
                        <SummaryStat label="Tiempo Máximo" value={`${stats.max} min`} />
                        <SummaryStat label="Promedio" value={`${stats.avg} min`} />
                        <SummaryStat label="Total de Casos" value={stats.total} />
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Porcentaje de Usuarios por Rango de Tiempo</h3>
                        <div className="space-y-4">
                           {rangeData.map(item => (
                               <div key={item.label} className="flex items-center">
                                   <div className="w-24 text-sm text-gray-600 dark:text-gray-400 text-right pr-4">{item.label}</div>
                                   <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                                       <div 
                                           className="bg-blue-600 h-6 rounded-full flex items-center justify-end px-2 text-white text-xs font-bold"
                                           style={{ width: `${item.percentage.toFixed(1)}%` }}
                                        >
                                           {item.percentage > 15 ? `${item.percentage.toFixed(1)}%` : ''}
                                       </div>
                                   </div>
                                    <div className="w-16 text-sm text-gray-800 dark:text-gray-200 text-left pl-4 font-semibold">{item.percentage <= 15 ? `${item.percentage.toFixed(1)}%` : ''}</div>
                               </div>
                           ))}
                        </div>
                    </div>

                </div>
                 <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-500">Cerrar</button>
                </div>
            </div>
        </div>
    );
};