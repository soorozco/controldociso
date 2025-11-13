
import React, { useMemo } from 'react';
import { AccionCorrectiva } from '../types';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ChartPieIcon } from './icons/ChartPieIcon';

interface AccionesCorrectivasSummaryProps {
    acciones: AccionCorrectiva[];
}

const statusColors: Record<string, string> = {
    'Abierta': 'bg-red-500',
    'En Proceso': 'bg-yellow-500',
    'Cerrada': 'bg-blue-500',
    'Verificada': 'bg-green-500',
};

export const AccionesCorrectivasSummary: React.FC<AccionesCorrectivasSummaryProps> = ({ acciones }) => {

    const summary = useMemo(() => {
        const totalAcciones = acciones.length;

        if (totalAcciones === 0) {
            return {
                totalAcciones: 0,
                byArea: {},
                byStatus: {},
                openClosedOverall: { open: 0, closed: 0 },
            };
        }

        const byArea: Record<string, { total: number; open: number; closed: number }> = {};
        const byStatus: Record<string, number> = {
            'Abierta': 0,
            'En Proceso': 0,
            'Cerrada': 0,
            'Verificada': 0,
        };
        let overallOpen = 0;
        let overallClosed = 0;

        acciones.forEach(accion => {
            // By Area
            if (!byArea[accion.area]) {
                byArea[accion.area] = { total: 0, open: 0, closed: 0 };
            }
            byArea[accion.area].total++;
            if (accion.estado === 'Abierta' || accion.estado === 'En Proceso') {
                byArea[accion.area].open++;
                overallOpen++;
            } else {
                byArea[accion.area].closed++;
                overallClosed++;
            }

            // By Status
            byStatus[accion.estado]++;
        });

        return {
            totalAcciones,
            byArea,
            byStatus,
            openClosedOverall: { open: overallOpen, closed: overallClosed },
        };
    }, [acciones]);

    const areasChartData = Object.entries(summary.byArea)
        .map(([area, data]) => ({ area, count: data.total }))
        .sort((a, b) => b.count - a.count); // Sort by count descending

    const statusPieData = Object.entries(summary.byStatus)
        .filter(([, count]) => count > 0)
        .map(([status, count]) => ({ status, count, percentage: (count / summary.totalAcciones) * 100 }));
    
    // FIX: Explicitly cast `item.count` to `number`
    const maxAreaCount = Math.max(...areasChartData.map(d => d.count as number), 0);

    const openClosedOverallPercentage = summary.totalAcciones > 0 ? (summary.openClosedOverall.open / summary.totalAcciones) * 100 : 0;


    return (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Resumen de Acciones Correctivas</h2>

            {summary.totalAcciones === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No hay acciones correctivas para mostrar un resumen.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Overall Open vs Closed */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ChartPieIcon className="w-5 h-5 text-blue-500" />
                            Estado General de Acciones ({summary.totalAcciones} en total)
                        </h3>
                        <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="relative w-32 h-32">
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
                                        className="text-orange-500" // Color for Open
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                        strokeDasharray={`${openClosedOverallPercentage} 100`}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        r="15.9155"
                                        cx="18"
                                        cy="18"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="2xl font-bold text-gray-800 dark:text-white">{openClosedOverallPercentage.toFixed(0)}%</span>
                                </div>
                            </div>
                            <div className="text-sm">
                                <p><span className="font-bold text-orange-500">{summary.openClosedOverall.open}</span> abiertas / en proceso</p>
                                <p><span className="font-bold text-green-500">{summary.openClosedOverall.closed}</span> cerradas / verificadas</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Porcentaje representa acciones abiertas/en proceso.</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions by Status (Detailed Pie) */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ChartPieIcon className="w-5 h-5 text-green-500" />
                            Distribución por Estado
                        </h3>
                        <div className="space-y-2">
                            {statusPieData.map(item => (
                                <div key={item.status} className="flex items-center gap-4">
                                    <span className={`h-4 w-4 rounded-full ${statusColors[item.status]}`}></span>
                                    <span className="text-sm text-gray-800 dark:text-gray-200">{item.status}:</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.count}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">({item.percentage.toFixed(1)}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions by Area (Bar Chart) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ChartBarIcon className="w-5 h-5 text-red-500" />
                            Acciones por Área
                        </h3>
                        <div className="space-y-3">
                            {areasChartData.map(item => (
                                <div key={item.area} className="flex items-center">
                                    <div className="w-40 text-sm text-gray-600 dark:text-gray-400 text-right pr-4 truncate" title={item.area}>{item.area}</div>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-r-md h-6">
                                        <div
                                            className="bg-blue-600 h-6 rounded-r-md flex items-center justify-end px-2 text-white text-xs font-bold"
                                            style={{ width: maxAreaCount > 0 ? `${(item.count as number / maxAreaCount) * 100}%` : '0%' }}
                                        >
                                            {(item.count as number) > 0 ? item.count : ''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};