import React, { useMemo } from 'react';
import { RegistroMinistracionMedicamentos } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorMinistracionMedicamentosSummaryProps {
    onClose: () => void;
    registros: RegistroMinistracionMedicamentos[];
}

const questions: { key: keyof RegistroMinistracionMedicamentos, label: string }[] = [
    { key: 'verificaDatosOrden', label: '1. Verifica que los datos del registro y nombre del paciente correspondan con la orden médica' },
    { key: 'verificaNombrePresentacion', label: '2. Verifica el nombre y la presentación del medicamento' },
    { key: 'verificaCaducidad', label: '3. Verifica la caducidad del medicamento' },
    { key: 'verificaDosisHora', label: '4. Verifica la dosis y hora de ministración del medicamento' },
    { key: 'hablaYExplica', label: '5. Le habla al paciente por su nombre y le explica el procedimiento que le va a realizar' },
    { key: 'cercioraIngestion', label: '6. Se cerciora que el paciente ingiera el medicamento' },
    { key: 'registraTermino', label: '7. Registra el medicamento al término del procedimiento en el formato establecido' },
];

export const IndicadorMinistracionMedicamentosSummary: React.FC<IndicadorMinistracionMedicamentosSummaryProps> = ({ onClose, registros }) => {

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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Ministración de Medicamentos Vía Oral</h2>
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
                                           className="bg-blue-600 h-5 rounded-full flex items-center justify-end px-2 text-white text-xs font-bold"
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