import React, { useMemo } from 'react';
import { RegistroEncuestaSatisfaccion, CalificacionSatisfaccion } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorSatisfaccionSummaryProps {
    onClose: () => void;
    registros: RegistroEncuestaSatisfaccion[];
}

const questions: { key: keyof RegistroEncuestaSatisfaccion, label: string }[] = [
    { key: 'tramitesIngreso', label: '1. Trámites de Ingreso' },
    { key: 'informacionNormas', label: '2. Información Normas' },
    { key: 'tiempoEsperaAtencion', label: '3. Tiempo de Espera' },
    { key: 'atencionEnfermeria', label: '4. Atención Enfermería' },
    { key: 'atencionPersonalMedico', label: '5. Atención Personal Médico' },
    { key: 'confidencialidadPrivacidad', label: '6. Confidencialidad' },
    { key: 'higieneLimpieza', label: '7. Higiene y Limpieza' },
    { key: 'vigilanciaInterna', label: '8. Vigilancia Interna' },
    { key: 'calidadAlimentos', label: '9. Calidad de Alimentos' },
    { key: 'servicioGeneral', label: '10. Servicio General' },
    { key: 'tramitesEgreso', label: '11. Trámites de Egreso' },
];
const ratings: CalificacionSatisfaccion[] = ['Excelente', 'Bueno', 'Regular', 'Malo', 'Pésimo'];
const ratingColors: Record<CalificacionSatisfaccion, string> = {
    'Excelente': 'bg-green-700',
    'Bueno': 'bg-green-500',
    'Regular': 'bg-yellow-500',
    'Malo': 'bg-orange-500',
    'Pésimo': 'bg-red-500'
};

export const IndicadorSatisfaccionSummary: React.FC<IndicadorSatisfaccionSummaryProps> = ({ onClose, registros }) => {

    const stats = useMemo(() => {
        const total = registros.length;
        if (total === 0) return { questions: [], recommendation: { SI: 0, NO: 0, total: 0 } };

        const questionStats = questions.map(q => {
            const counts = ratings.reduce((acc, rating) => {
                acc[rating] = 0;
                return acc;
            }, {} as Record<CalificacionSatisfaccion, number>);
            
            registros.forEach(r => {
                counts[r[q.key] as CalificacionSatisfaccion]++;
            });
            
            const percentages = ratings.reduce((acc, rating) => {
                acc[rating] = (counts[rating] / total) * 100;
                return acc;
            }, {} as Record<CalificacionSatisfaccion, number>);

            return { key: q.key, label: q.label, counts, percentages };
        });

        const recommendation = {
            SI: registros.filter(r => r.recomendaria === 'SI').length,
            NO: registros.filter(r => r.recomendaria === 'NO').length,
            total,
        };

        return { questions: questionStats, recommendation };
    }, [registros]);

    const opportunityAreas = useMemo(() => {
        const poorRatings: CalificacionSatisfaccion[] = ['Regular', 'Malo', 'Pésimo'];
        const areasByQuestion = new Map<string, Map<string, number>>();

        questions.forEach(q => {
            registros.forEach(r => {
                const rating = r[q.key] as CalificacionSatisfaccion;
                if (poorRatings.includes(rating) && r.habitacion) {
                    const areaPrefix = r.habitacion.match(/^[A-Z]+/)?.[0];
                    if (areaPrefix) {
                        if (!areasByQuestion.has(q.key)) {
                            areasByQuestion.set(q.key, new Map<string, number>());
                        }
                        const areaMap = areasByQuestion.get(q.key)!;
                        areaMap.set(areaPrefix, (areaMap.get(areaPrefix) || 0) + 1);
                    }
                }
            });
        });

        const result: { key: string, label: string, areas: { name: string, count: number }[] }[] = [];
        areasByQuestion.forEach((areaMap, questionKey) => {
            const sortedAreas = Array.from(areaMap.entries())
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count);

            if (sortedAreas.length > 0) {
                result.push({
                    key: questionKey,
                    label: questions.find(q => q.key === questionKey)?.label || questionKey,
                    areas: sortedAreas
                });
            }
        });
        return result;
    }, [registros]);
    
    const recommendationPercent = stats.recommendation.total > 0
        ? (stats.recommendation.SI / stats.recommendation.total) * 100
        : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Encuesta de Satisfacción (Total: {registros.length})</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Distribución de Respuestas por Pregunta</h3>
                            <div className="space-y-4">
                                {stats.questions.map(q => (
                                    <div key={q.key}>
                                        <p className="text-sm font-medium mb-1">{q.label}</p>
                                        <div className="flex h-6 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                            {ratings.map(r => (
                                                <div key={r} className={`${ratingColors[r]}`} style={{ width: `${q.percentages[r]}%`}} title={`${r}: ${q.percentages[r].toFixed(1)}%`}></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="flex flex-col gap-8">
                            <div>
                                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recomendación del Servicio</h3>
                                 <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
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
                                                className="text-green-500"
                                                stroke="currentColor"
                                                strokeWidth="3.5"
                                                strokeDasharray={`${recommendationPercent} 100`}
                                                strokeLinecap="round"
                                                fill="transparent"
                                                r="15.9155"
                                                cx="18"
                                                cy="18"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-gray-800 dark:text-white">{recommendationPercent.toFixed(0)}%</span>
                                        </div>
                                    </div>
                                     <div className="text-sm">
                                         <p><span className="font-bold">{stats.recommendation.SI} de {stats.recommendation.total}</span> pacientes recomendarían el servicio.</p>
                                          <div className="flex items-center gap-4 mt-2">
                                            {ratings.map(r => <div key={r} className="flex items-center gap-1.5"><span className={`h-3 w-3 rounded-full ${ratingColors[r]}`}></span><span>{r}</span></div>)}
                                        </div>
                                     </div>
                                 </div>
                            </div>
                            <div className="overflow-x-auto">
                               <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tabla de Cumplimiento (%)</h3>
                                <table className="min-w-full text-xs">
                                    <thead className="text-left text-gray-500 dark:text-gray-400">
                                        <tr>
                                            <th className="p-1.5 font-semibold">Pregunta</th>
                                            {ratings.map(r => <th key={r} className="p-1.5 font-semibold text-center">{r}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {stats.questions.map(q => (
                                            <tr key={q.key}>
                                                <td className="p-1.5 font-medium w-1/4 truncate" title={q.label}>{q.label}</td>
                                                {ratings.map(r => (
                                                     <td key={r} className="p-1.5 text-center">{q.percentages[r].toFixed(1)}%</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                         </div>
                    </div>
                    {opportunityAreas.length > 0 && (
                        <div className="lg:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Análisis de Oportunidades por Área</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                A continuación se muestran las áreas con calificaciones bajas (Regular, Malo, Pésimo) para preguntas específicas.
                            </p>
                            <div className="space-y-4">
                                {opportunityAreas.map(item => (
                                    <div key={item.key} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.label}</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {item.areas.map(area => (
                                                <span key={area.name} className="bg-orange-100 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200 px-2 py-1 rounded-full text-xs font-medium">
                                                    {area.name}: {area.count} {area.count > 1 ? 'calificaciones' : 'calificación'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-500">Cerrar</button>
                </div>
            </div>
        </div>
    );
};