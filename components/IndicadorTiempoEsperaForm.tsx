import React, { useState } from 'react';
import { RegistroTiempoEspera } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorTiempoEsperaFormProps {
    onClose: () => void;
    onSave: (registro: RegistroTiempoEspera) => void;
}

const emptyRegistro: Omit<RegistroTiempoEspera, 'id' | 'minutosEspera'> = {
    fecha: new Date().toISOString().split('T')[0],
    turno: 'Matutino',
    genero: 'Mujer',
    solicitudHora: '',
    entradaHora: '',
};

export const IndicadorTiempoEsperaForm: React.FC<IndicadorTiempoEsperaFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyRegistro);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const [solicitudH, solicitudM] = formData.solicitudHora.split(':').map(Number);
        const [entradaH, entradaM] = formData.entradaHora.split(':').map(Number);
        
        const solicitudDate = new Date(0);
        solicitudDate.setUTCHours(solicitudH, solicitudM);
        
        const entradaDate = new Date(0);
        entradaDate.setUTCHours(entradaH, entradaM);

        if (entradaDate < solicitudDate) {
            entradaDate.setDate(entradaDate.getDate() + 1); // Handle next day case
        }

        const diffMs = entradaDate.getTime() - solicitudDate.getTime();
        const minutosEspera = Math.round(diffMs / 60000);
        
        onSave({
            ...formData,
            id: `te-${Date.now()}`,
            minutosEspera,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Registro: Tiempo de Espera</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha del Registro</label>
                            <input type="date" name="fecha" id="fecha" value={formData.fecha} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
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
                        <div>
                            <label htmlFor="genero" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Género</label>
                            <select name="genero" id="genero" value={formData.genero} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option>Mujer</option>
                                <option>Hombre</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="solicitudHora" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Momento de Solicitar</label>
                            <input type="time" name="solicitudHora" id="solicitudHora" value={formData.solicitudHora} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="entradaHora" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Momento de Entrada</label>
                            <input type="time" name="entradaHora" id="entradaHora" value={formData.entradaHora} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
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