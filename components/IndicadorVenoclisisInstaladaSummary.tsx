import React, { useMemo } from 'react';
import { RegistroVenoclisisInstalada } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorVenoclisisInstaladaSummaryProps {
    onClose: () => void;
    registros: RegistroVenoclisisInstalada[];
}

const questions: { key: keyof RegistroVenoclisisInstalada, label: string }[] = [
    { key: 'solucionMenos24h', label: '1. Solución instalada < 24h' },
    { key: 'membreteNormativo', label: '2. Membrete conforme a normatividad' },
    { key: 'equipoMenos72h', label: '3. Venoclisis y equipo < 72h' },
    { key: 'equipoLibreResiduos', label: '4. Equipo libre de residuos' },
    { key: 'sitioPuncionLimpio', label: '5. Sitio de punción sin signos de infección' },
    { key: 'cateterFijoLimpio', label: '6. Catéter firme y fijación limpia' },
    { key: 'circuitoCerrado', label: '7. Solución con circuito cerrado' },
];

export const IndicadorVenoclisisInstaladaSummary: React.FC<IndicadorVenoclisisInstaladaSummaryProps> = ({ onClose, registros }) => {

    const stats = useMemo(() => {
        const totalRegistros = registros.length;
        if (totalRegistros === 0) {
            return questions.map(q => ({ ...q, yes: 0, percentage: 0 }));
        }

        return questions.map(q => {
            const yesCount = registros.filter(r => r[q.key] === true).length;
            return {
                ...q,
                yes: yesCount,
                percentage: (yesCount / totalRegistros) * 100,
            };
        });
    }, [registros]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Vigilancia y Control de Venoclisis Instalada</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cumplimiento por Criterio (Total: {registros.length})</h3>
                         <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                                    <tr>
                                        <th className="p-2 font-semibold">Variable</th>
                                        <th className="p-2 font-semibold text-center">Sí (No.)</th>
                                        <th className="p-2 font-semibold text-center">% Cumplimiento</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {stats.map(stat => (
                                        <tr key={stat.key}>
                                            <td className="p-2">{stat.label}</td>
                                            <td className="p-2 text-center">{stat.yes}</td>
                                            <td className="p-2 text-center font-bold">{stat.percentage.toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Gráfico de Cumplimiento</h3>
                        <div className="space-y-3">
                           {stats.map(item => (
                               <div key={item.key} className="flex items-center">
                                   <div className="w-8 text-xs text-gray-600 dark:text-gray-400 text-left pr-2 font-medium">{item.label.charAt(0)}.</div>
                                   <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                                       <div 
                                           className="bg-teal-600 h-5 rounded-full flex items-center justify-end px-2 text-white text-xs font-bold"
                                           style={{ width: `${item.percentage}%` }}
                                        >
                                           {item.percentage > 20 ? `${item.percentage.toFixed(1)}%` : ''}
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
