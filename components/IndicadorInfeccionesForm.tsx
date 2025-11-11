
import React, { useState } from 'react';
import { RegistroInfeccionesNosocomiales } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorInfeccionesFormProps {
    onClose: () => void;
    onSave: (registro: RegistroInfeccionesNosocomiales) => void;
}

const emptyRegistro: Omit<RegistroInfeccionesNosocomiales, 'id' | 'mes'> = {
    area: 'Cirugía General',
    bacteriemias: { casos: 0, diasExposicion: 0 },
    neumonias: { casos: 0, diasExposicion: 0 },
    sitioQuirurgico: { casos: 0, procedimientos: 0 },
    viasUrinarias: { casos: 0, diasExposicion: 0 },
};

const InputGroup: React.FC<{ label: string, name: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, value, onChange }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input type="number" name={name} id={name} value={value} onChange={onChange} min="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
    </div>
);

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const years = [...Array(5)].map((_, i) => new Date().getFullYear() - i);


export const IndicadorInfeccionesForm: React.FC<IndicadorInfeccionesFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyRegistro);
    const [selectedMonth, setSelectedMonth] = useState(meses[new Date().getMonth()]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInfectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [type, field] = name.split('.');
        // FIX: The type of `prev[type]` can be a string, which cannot be spread.
        // By casting `type` to a key that is known to correspond to an object value,
        // we ensure type safety and correct behavior.
        const infectionKey = type as 'bacteriemias' | 'neumonias' | 'sitioQuirurgico' | 'viasUrinarias';
        setFormData(prev => ({
            ...prev,
            [infectionKey]: {
                ...prev[infectionKey],
                [field]: parseInt(value, 10) || 0,
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mes = `${selectedMonth} ${selectedYear}`;
        onSave({ ...formData, id: `in-${Date.now()}`, mes });
    };

    const areas: RegistroInfeccionesNosocomiales['area'][] = ['Cirugía General', 'Pediatría', 'Medicina Interna', 'Ginecología Obstétrica', 'UCIN', 'UCIA'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Registro: Infecciones Nosocomiales</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                             <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="mes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mes</label>
                                <select id="mes" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700">
                                    {meses.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Año</label>
                                <select id="year" value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700">
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                            <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Área de Servicio</label>
                                <select name="area" id="area" value={formData.area} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700">
                                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">Bacteriemias asociadas a catéter central</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <InputGroup label="Total de Bacteriemias" name="bacteriemias.casos" value={formData.bacteriemias.casos} onChange={handleInfectionChange} />
                                <InputGroup label="Días Catéter Central" name="bacteriemias.diasExposicion" value={formData.bacteriemias.diasExposicion} onChange={handleInfectionChange} />
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">Neumonías asociadas a ventilador</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <InputGroup label="Total de Neumonías" name="neumonias.casos" value={formData.neumonias.casos} onChange={handleInfectionChange} />
                                <InputGroup label="Días ventilador" name="neumonias.diasExposicion" value={formData.neumonias.diasExposicion} onChange={handleInfectionChange} />
                            </div>
                        </div>
                        
                         <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">Infecciones en sitio quirúrgico</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <InputGroup label="Total de Infecciones" name="sitioQuirurgico.casos" value={formData.sitioQuirurgico.casos} onChange={handleInfectionChange} />
                                <InputGroup label="Procedimientos quirúrgicos" name="sitioQuirurgico.procedimientos" value={formData.sitioQuirurgico.procedimientos} onChange={handleInfectionChange} />
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">Infecciones de vías urinarias asociadas a sonda vesical</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <InputGroup label="Total de Infecciones" name="viasUrinarias.casos" value={formData.viasUrinarias.casos} onChange={handleInfectionChange} />
                                <InputGroup label="Días sonda vesical" name="viasUrinarias.diasExposicion" value={formData.viasUrinarias.diasExposicion} onChange={handleInfectionChange} />
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
