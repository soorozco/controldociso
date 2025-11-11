
import React, { useMemo } from 'react';
import { RegistroInfeccionesNosocomiales } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorInfeccionesSummaryProps {
    onClose: () => void;
    registros: RegistroInfeccionesNosocomiales[];
}

const calculateRate = (casos: number, total: number) => {
    if (total === 0) return '0.0';
    return ((casos / total) * 1000).toFixed(1);
};

// FIX: Define a specific type for the summary and explicitly type the accumulator in reduce to prevent properties from being inferred as 'unknown'.
type AreaSummary = {
    bacteriemias: { casos: number; diasExposicion: number };
    neumonias: { casos: number; diasExposicion: number };
    sitioQuirurgico: { casos: number; procedimientos: number };
    viasUrinarias: { casos: number; diasExposicion: number };
    totalInfecciones: number;
};

export const IndicadorInfeccionesSummary: React.FC<IndicadorInfeccionesSummaryProps> = ({ onClose, registros }) => {
    
    const summaryByArea = useMemo(() => {
        const initial: AreaSummary = {
            bacteriemias: { casos: 0, diasExposicion: 0 },
            neumonias: { casos: 0, diasExposicion: 0 },
            sitioQuirurgico: { casos: 0, procedimientos: 0 },
            viasUrinarias: { casos: 0, diasExposicion: 0 },
            totalInfecciones: 0,
        };
        
        // FIX: Explicitly cast the initial value of reduce to ensure `result` is correctly typed. This prevents properties like 'totalInfecciones' from being inferred as 'unknown'.
        const result = registros.reduce((acc: Record<string, AreaSummary>, reg: RegistroInfeccionesNosocomiales) => {
            if (!acc[reg.area]) {
                acc[reg.area] = JSON.parse(JSON.stringify(initial));
            }
            // FIX: Explicitly cast 'area' to ensure type safety, as the enum 'area' is implicitly string.
            const areaKey: keyof typeof acc = reg.area;
            const area = acc[areaKey];
            area.bacteriemias.casos += reg.bacteriemias.casos;
            area.bacteriemias.diasExposicion += reg.bacteriemias.diasExposicion;
            area.neumonias.casos += reg.neumonias.casos;
            area.neumonias.diasExposicion += reg.neumonias.diasExposicion;
            area.sitioQuirurgico.casos += reg.sitioQuirurgico.casos;
            area.sitioQuirurgico.procedimientos += reg.sitioQuirurgico.procedimientos;
            area.viasUrinarias.casos += reg.viasUrinarias.casos;
            area.viasUrinarias.diasExposicion += reg.viasUrinarias.diasExposicion;
            area.totalInfecciones += reg.bacteriemias.casos + reg.neumonias.casos + reg.sitioQuirurgico.casos + reg.viasUrinarias.casos;
            return acc;
        }, {} as Record<string, AreaSummary>);

        return result;

    }, [registros]);

    const chartData = Object.entries(summaryByArea).map(([area, data]) => ({
        area,
        count: data.totalInfecciones
    }));
    
    const maxCount = Math.max(...chartData.map(d => d.count), 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Tasa de Infecciones Nosocomiales</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tasas por 1,000 Días/Procedimientos por Área</h3>
                         <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="text-left text-gray-500 dark:text-gray-400">
                                    <tr>
                                        <th className="p-2 font-medium">Área de Servicio</th>
                                        <th className="p-2 font-medium text-center">Bacteriemias</th>
                                        <th className="p-2 font-medium text-center">Neumonías</th>
                                        <th className="p-2 font-medium text-center">Sitio Qx.</th>
                                        <th className="p-2 font-medium text-center">Vías Urinarias</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {Object.entries(summaryByArea).map(([area, data]) => (
                                        <tr key={area}>
                                            <td className="p-2 font-semibold text-gray-800 dark:text-gray-200">{area}</td>
                                            <td className="p-2 text-center">{calculateRate(data.bacteriemias.casos, data.bacteriemias.diasExposicion)}</td>
                                            <td className="p-2 text-center">{calculateRate(data.neumonias.casos, data.neumonias.diasExposicion)}</td>
                                            <td className="p-2 text-center">{calculateRate(data.sitioQuirurgico.casos, data.sitioQuirurgico.procedimientos)}</td>
                                            <td className="p-2 text-center">{calculateRate(data.viasUrinarias.casos, data.viasUrinarias.diasExposicion)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total de Infecciones por Área</h3>
                        <div className="space-y-3">
                           {chartData.sort((a,b) => b.count - a.count).map(item => (
                               <div key={item.area} className="flex items-center">
                                   <div className="w-32 text-xs text-gray-600 dark:text-gray-400 text-right pr-4 truncate" title={item.area}>{item.area}</div>
                                   <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-r-md h-6">
                                       <div 
                                           className="bg-red-500 h-6 rounded-r-md flex items-center justify-end px-2 text-white text-xs font-bold"
                                           style={{ width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%' }}
                                        >
                                           {item.count > 0 ? item.count : ''}
                                       </div>
                                   </div>
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
