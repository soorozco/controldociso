import React, { useMemo } from 'react';
import { RegistroTratoDignoEnfermeria } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorTratoDignoSummaryProps {
    onClose: () => void;
    registros: RegistroTratoDignoEnfermeria[];
}

const questions: { key: keyof RegistroTratoDignoEnfermeria, label: string }[] = [
    { key: 'saludoAmable', label: '1. ¿La enfermera(o) lo saluda en forma amable?' },
    { key: 'sePresenta', label: '2. ¿Se presenta la enfermera(o) con usted?' },
    { key: 'usaNombre', label: '3. ¿Cuándo la enfermera(o) se dirige a usted lo hace por su nombre?' },
    { key: 'explicaCuidados', label: '4. ¿La enfermera(o) le explica sobre los cuidados o actividades que le va a realizar?' },
    { key: 'estanciaAgradable', label: '5. ¿La enfermera(o) se interesa porque su estancia sea agradable?' },
    { key: 'cuidaIntimidad', label: '6. ¿La enfermera(o) procura ofrecerle condiciones que guardan su intimidad y/o pudor?' },
    { key: 'daSeguridad', label: '7. ¿La enfermera(o) le hace sentirse segura(o) al atenderle?' },
    { key: 'tratoRespetuoso', label: '8. ¿La enfermera(o) lo trata con respeto?' },
    { key: 'ensenanzaCuidados', label: '9. ¿La enfermera(o) le enseña a usted o a su familiar los cuidados sobre su padecimiento?' },
    { key: 'continuidadCuidados', label: '10. ¿Hay continuidad en los cuidados de enfermería las 24 horas del día?' },
    { key: 'satisfechoTrato', label: '11. ¿Se siente satisfecho con el trato que le da la enfermera(o)?' },
];

export const IndicadorTratoDignoSummary: React.FC<IndicadorTratoDignoSummaryProps> = ({ onClose, registros }) => {

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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Trato Digno por Enfermería</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cumplimiento por Criterio</h3>
                         <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                                    <tr>
                                        <th className="p-2 font-semibold">Criterio de Evaluación</th>
                                        <th className="p-2 font-semibold text-center">Sí</th>
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
                                   <div className="w-64 text-xs text-gray-600 dark:text-gray-400 text-right pr-4 truncate" title={item.label}>{item.label.substring(0, 30)}...</div>
                                   <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                                       <div 
                                           className="bg-green-600 h-5 rounded-full flex items-center justify-end px-2 text-white text-xs font-bold"
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
