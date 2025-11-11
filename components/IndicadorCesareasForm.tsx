import React, { useState } from 'react';
import { RegistroNacimientosCesareas } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorCesareasFormProps {
    onClose: () => void;
    onSave: (registro: RegistroNacimientosCesareas) => void;
}

const emptyRegistro: Omit<RegistroNacimientosCesareas, 'id' | 'porcentajeCesareas' | 'mes'> = {
    turno: 'Matutino',
    totalNacimientos: 0,
    vaginales: 0,
    cesareas: 0,
};

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const years = [...Array(5)].map((_, i) => new Date().getFullYear() - i);

export const IndicadorCesareasForm: React.FC<IndicadorCesareasFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyRegistro);
    const [selectedMonth, setSelectedMonth] = useState(meses[new Date().getMonth()]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const processedValue = (e.target.type === 'number') ? parseInt(value, 10) || 0 : value;
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.vaginales + formData.cesareas !== formData.totalNacimientos) {
            alert('La suma de partos vaginales y cesáreas debe ser igual al total de nacimientos.');
            return;
        }

        const porcentajeCesareas = formData.totalNacimientos > 0 
            ? (formData.cesareas / formData.totalNacimientos) * 100 
            : 0;
        
        const mes = `${selectedMonth} ${selectedYear}`;
        
        onSave({
            ...formData,
            id: `nc-${Date.now()}`,
            porcentajeCesareas,
            mes
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Registro: Nacimientos por Cesárea</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="mes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mes</label>
                                <select id="mes" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700">
                                    {meses.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Año</label>
                                <select id="year" value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700">
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="turno" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Turno</label>
                            <select name="turno" id="turno" value={formData.turno} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option>Matutino</option>
                                <option>Vespertino</option>
                                <option>Nocturno</option>
                                <option>Jornada Especial</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                             <div>
                                <label htmlFor="totalNacimientos" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Nacimientos</label>
                                <input type="number" name="totalNacimientos" id="totalNacimientos" value={formData.totalNacimientos} onChange={handleChange} required min="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            </div>
                             <div>
                                <label htmlFor="vaginales" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vaginales</label>
                                <input type="number" name="vaginales" id="vaginales" value={formData.vaginales} onChange={handleChange} required min="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            </div>
                             <div>
                                <label htmlFor="cesareas" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cesáreas</label>
                                <input type="number" name="cesareas" id="cesareas" value={formData.cesareas} onChange={handleChange} required min="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">Guardar Registro</button>
                    </div>
                </form>
            </div>
        </div>
    );
};