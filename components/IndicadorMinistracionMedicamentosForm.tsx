import React, { useState } from 'react';
import { RegistroMinistracionMedicamentos } from '../types';
import { XIcon } from './icons/XIcon';

interface IndicadorMinistracionMedicamentosFormProps {
    onClose: () => void;
    onSave: (registro: RegistroMinistracionMedicamentos) => void;
}

const emptyRegistro: Omit<RegistroMinistracionMedicamentos, 'id'> = {
    fecha: new Date().toISOString().split('T')[0],
    turno: 'Matutino',
    genero: 'Mujer',
    claveEnfermeria: '',
    numeroExpediente: '',
    verificaDatosOrden: true,
    verificaNombrePresentacion: true,
    verificaCaducidad: true,
    verificaDosisHora: true,
    hablaYExplica: true,
    cercioraIngestion: true,
    registraTermino: true,
};

const questions: { key: keyof RegistroMinistracionMedicamentos, label: string }[] = [
    { key: 'verificaDatosOrden', label: '1. ¿Verifica que los datos del registro y nombre del paciente correspondan con la orden médica?' },
    { key: 'verificaNombrePresentacion', label: '2. ¿Verifica el nombre y la presentación del medicamento?' },
    { key: 'verificaCaducidad', label: '3. ¿Verifica la caducidad del medicamento?' },
    { key: 'verificaDosisHora', label: '4. ¿Verifica la dosis y hora de ministración del medicamento?' },
    { key: 'hablaYExplica', label: '5. ¿Le habla al paciente por su nombre y le explica el procedimiento que le va a realizar?' },
    { key: 'cercioraIngestion', label: '6. ¿Se cerciora que el paciente ingiera el medicamento?' },
    { key: 'registraTermino', label: '7. ¿Registra el medicamento al término del procedimiento en el formato establecido?' },
];

const QuestionRow: React.FC<{
    label: string;
    name: keyof RegistroMinistracionMedicamentos;
    value: boolean;
    onChange: (name: keyof RegistroMinistracionMedicamentos, value: boolean) => void;
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

export const IndicadorMinistracionMedicamentosForm: React.FC<IndicadorMinistracionMedicamentosFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyRegistro);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleQuestionChange = (name: keyof RegistroMinistracionMedicamentos, value: boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: `mmvoe-${Date.now()}` });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Registro: Ministración de Medicamentos</h2>
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
                                <label htmlFor="claveEnfermeria" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clave Enfermería</label>
                                <input type="text" name="claveEnfermeria" id="claveEnfermeria" value={formData.claveEnfermeria} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            </div>
                            <div>
                                <label htmlFor="turno" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Turno</label>
                                <select name="turno" id="turno" value={formData.turno} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700">
                                    <option>Matutino</option>
                                    <option>Vespertino</option>
                                    <option>Nocturno</option>
                                    <option>Jornada Especial</option>
                                </select>
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