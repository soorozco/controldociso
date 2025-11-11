import React, { useState } from 'react';
import { RegistroPrevencionCaidas } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorPrevencionCaidasFormProps {
    onClose: () => void;
    onSave: (registro: RegistroPrevencionCaidas) => void;
}

const emptyRegistro: Omit<RegistroPrevencionCaidas, 'id'> = {
    fecha: new Date().toISOString().split('T')[0],
    turno: 'Matutino',
    genero: 'Mujer',
    numeroExpediente: '',
    valoraRiesgo: true,
    establecePlan: true,
    utilizaRecursos: true,
    informaPaciente: true,
    orientaEquipo: true,
    revaloraAjusta: true,
    registraIncidente: true,
};

const questions: { key: keyof RegistroPrevencionCaidas, label: string }[] = [
    { key: 'valoraRiesgo', label: '1. ¿Valora y registra los factores de riesgo de caída?' },
    { key: 'establecePlan', label: '2. ¿Establece en el plan de cuidados las intervenciones de enfermería de acuerdo al riesgo de caída?' },
    { key: 'utilizaRecursos', label: '3. ¿Utiliza los recursos disponibles y necesarios para la seguridad del paciente?' },
    { key: 'informaPaciente', label: '4. ¿Informa al paciente y familiar sobre el riesgo de caída?' },
    { key: 'orientaEquipo', label: '5. ¿Orienta sobre el uso y manejo del equipo y elementos para la seguridad del paciente?' },
    { key: 'revaloraAjusta', label: '6. ¿Revalora y ajusta de acuerdo al estado del paciente las intervenciones de enfermería?' },
    { key: 'registraIncidente', label: '7. ¿Registra presencia o ausencia de incidente o accidente que presente el paciente?' },
];

const QuestionRow: React.FC<{
    label: string;
    name: keyof RegistroPrevencionCaidas;
    value: boolean;
    onChange: (name: keyof RegistroPrevencionCaidas, value: boolean) => void;
}> = ({ label, name, value, onChange }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-800 dark:text-gray-200">{label}</span>
        <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={name} checked={value} onChange={() => onChange(name, true)} className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Sí</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={name} checked={!value} onChange={() => onChange(name, false)} className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">No</span>
            </label>
        </div>
    </div>
);

export const IndicadorPrevencionCaidasForm: React.FC<IndicadorPrevencionCaidasFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyRegistro);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleQuestionChange = (name: keyof RegistroPrevencionCaidas, value: boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: `pc-${Date.now()}` });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Registro: Prevención de Caídas</h2>
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