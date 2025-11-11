
import React, { useState } from 'react';
import { RegistroTratoDignoEnfermeria } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorTratoDignoFormProps {
    onClose: () => void;
    onSave: (registro: RegistroTratoDignoEnfermeria) => void;
}

const emptyRegistro: Omit<RegistroTratoDignoEnfermeria, 'id'> = {
    fecha: new Date().toISOString().split('T')[0],
    turno: 'Matutino', // FIX: Added missing 'turno' property
    genero: 'Mujer',
    numeroExpediente: '',
    saludoAmable: true,
    sePresenta: true,
    usaNombre: true,
    explicaCuidados: true,
    estanciaAgradable: true,
    cuidaIntimidad: true,
    daSeguridad: true,
    tratoRespetuoso: true,
    ensenanzaCuidados: true,
    continuidadCuidados: true,
    satisfechoTrato: true,
};

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


const QuestionRow: React.FC<{
    label: string;
    name: keyof RegistroTratoDignoEnfermeria;
    value: boolean;
    onChange: (name: keyof RegistroTratoDignoEnfermeria, value: boolean) => void;
}> = ({ label, name, value, onChange }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-800 dark:text-gray-200">{label}</span>
        <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={name} checked={value} onChange={() => onChange(name, true)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <span className="text-sm font-medium">Sí</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={name} checked={!value} onChange={() => onChange(name, false)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <span className="text-sm font-medium">No</span>
            </label>
        </div>
    </div>
);


export const IndicadorTratoDignoForm: React.FC<IndicadorTratoDignoFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyRegistro);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleQuestionChange = (name: keyof RegistroTratoDignoEnfermeria, value: boolean) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: `tde-${Date.now()}` });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Registro: Trato Digno por Enfermería</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
                                <input type="date" name="fecha" id="fecha" value={formData.fecha} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            </div>
                            <div>
                                <label htmlFor="numeroExpediente" className="block text-sm font-medium text-gray-700 dark:text-gray-300">No. Expediente</label>
                                <input type="text" name="numeroExpediente" id="numeroExpediente" value={formData.numeroExpediente} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            </div>
                            <div>
                                <label htmlFor="genero" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Género</label>
                                <select name="genero" id="genero" value={formData.genero} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700">
                                    <option>Mujer</option>
                                    <option>Hombre</option>
                                </select>
                            </div>
                        </div>

                        <div>
                           {questions.map(q => (
                               <QuestionRow 
                                 key={q.key}
                                 label={q.label}
                                 name={q.key}
                                 value={formData[q.key] as boolean}
                                 onChange={handleQuestionChange}
                               />
                           ))}
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
