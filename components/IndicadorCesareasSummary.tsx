
import React, { useMemo } from 'react';
import { RegistroNacimientosCesareas } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorCesareasSummaryProps {
    onClose: () => void;
    registros: RegistroNacimientosCesareas[];
}

type TurnoData = {
    totalNacimientos: number;
    vaginales: number;
    cesareas: number;
    porcentaje: number;
}

export const IndicadorCesareasSummary: React.FC<IndicadorCesareasSummaryProps> = ({ onClose, registros }) => {
    
    const summaryByTurno = useMemo(() => {
        const turnos: Record<string, TurnoData> = {
            'Matutino': { totalNacimientos: 0, vaginales: 0, cesareas: 0, porcentaje: 0 },
            'Vespertino': { totalNacimientos: 0, vaginales: 0, cesareas: 0, porcentaje: 0 },
            'Nocturno': { totalNacimientos: 0, vaginales: 0, cesareas: 0, porcentaje: 0 },
            'Jornada Especial': { totalNacimientos: 0, vaginales: 0, cesareas: 0, porcentaje: 0 },
        };

        registros.forEach(reg => {
            const turnoData = turnos[reg.turno];
            turnoData.totalNacimientos += reg.totalNacimientos;
            turnoData.vaginales += reg.vaginales;
            turnoData.cesareas += reg.cesareas;
        });

        Object.values(turnos).forEach(turnoData => {
            turnoData.porcentaje = turnoData.totalNacimientos > 0 
                ? (turnoData.cesareas / turnoData.totalNacimientos) * 100 
                : 0;
        });

        // FIX: Explicitly type the accumulator and initial value of the reduce function to ensure type safety when calculating totals.
        const total = Object.values(turnos).reduce((acc: TurnoData, curr: TurnoData) => {
            acc.totalNacimientos += curr.totalNacimientos;
            acc.vaginales += curr.vaginales;
            acc.cesareas += curr.cesareas;
            return acc;
        }, { totalNacimientos: 0, vaginales: 0, cesareas: 0, porcentaje: 0 } as TurnoData);

        total.porcentaje = total.totalNacimientos > 0 
            ? (total.cesareas / total.totalNacimientos) * 100 
            : 0;

        return { turnos, total };

    }, [registros]);
    
    const chartData = [
        { label: 'MAT.', value: summaryByTurno.turnos['Matutino'].porcentaje },
        { label: 'VESP.', value: summaryByTurno.turnos['Vespertino'].porcentaje },
        { label: 'NOCT.', value: summaryByTurno.turnos['Nocturno'].porcentaje },
        { label: 'JE', value: summaryByTurno.turnos['Jornada Especial'].porcentaje },
        { label: 'TOTAL', value: summaryByTurno.total.porcentaje },
    ];
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen: Nacimientos por Cesárea (Concentrado)</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Datos por Turno</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                                    <tr>
                                        <th className="p-2 font-semibold">Turno</th>
                                        <th className="p-2 font-semibold text-center">Total Nacimientos</th>
                                        <th className="p-2 font-semibold text-center">Vaginales</th>
                                        <th className="p-2 font-semibold text-center">Cesáreas</th>
                                        <th className="p-2 font-semibold text-center">% Cesáreas</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {Object.entries(summaryByTurno.turnos).map(([turno, data]) => (
                                        <tr key={turno}>
                                            <td className="p-2 font-medium">{turno}</td>
                                            <td className="p-2 text-center">{data.totalNacimientos}</td>
                                            <td className="p-2 text-center">{data.vaginales}</td>
                                            <td className="p-2 text-center">{data.cesareas}</td>
                                            <td className="p-2 text-center font-bold">{data.porcentaje.toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                                        <td className="p-2">TOTAL</td>
                                        <td className="p-2 text-center">{summaryByTurno.total.totalNacimientos}</td>
                                        <td className="p-2 text-center">{summaryByTurno.total.vaginales}</td>
                                        <td className="p-2 text-center">{summaryByTurno.total.cesareas}</td>
                                        <td className="p-2 text-center">{summaryByTurno.total.porcentaje.toFixed(1)}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Gráfico de Muestreo de Cesárea (%)</h3>
                         <div className="flex justify-around items-end h-64 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                            {chartData.map(item => (
                                <div key={item.label} className="flex flex-col items-center w-1/6">
                                    <div className="text-xs font-bold mb-1">{item.value.toFixed(1)}%</div>
                                    <div className="w-full bg-blue-500" style={{ height: `${item.value}%` }}></div>
                                    <div className="mt-2 text-sm font-medium">{item.label}</div>
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
