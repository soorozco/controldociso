import React, { useState } from 'react';
import { RegistroEncuestaSatisfaccion, CalificacionSatisfaccion } from '../types';
import { XIcon } from './icons/XIcon';
import { roomData } from '../data/rooms';

interface IndicadorSatisfaccionFormProps {
    onClose: () => void;
    onSave: (registro: RegistroEncuestaSatisfaccion) => void;
}

const emptyRegistro: Omit<RegistroEncuestaSatisfaccion, 'id'> = {
    fecha: new Date().toISOString().split('T')[0],
    paciente: '',
    habitacion: '',
    medico: '',
    tramitesIngreso: 'Excelente',
    informacionNormas: 'Excelente',
    tiempoEsperaAtencion: 'Excelente',
    atencionEnfermeria: 'Excelente',
    atencionPersonalMedico: 'Excelente',
    confidencialidadPrivacidad: 'Excelente',
    higieneLimpieza: 'Excelente',
    vigilanciaInterna: 'Excelente',
    calidadAlimentos: 'Excelente',
    servicioGeneral: 'Excelente',
    tramitesEgreso: 'Excelente',
    recomendaria: 'SI',
    comentarios: '',
};

const questions: { key: keyof RegistroEncuestaSatisfaccion, label: string }[] = [
    { key: 'tramitesIngreso', label: 'A su llegada al hospital los trámites de ingreso le resultaron' },
    { key: 'informacionNormas', label: 'A su ingreso ¿Le informaron sobre las normas generales del hospital?' },
    { key: 'tiempoEsperaAtencion', label: '¿El tiempo de espera para su atención fue?' },
    { key: 'atencionEnfermeria', label: '¿Cómo calificaría la atención y cuidados de enfermería?' },
    { key: 'atencionPersonalMedico', label: '¿Cómo calificaría la atención del personal médico?' },
    { key: 'confidencialidadPrivacidad', label: '¿Está satisfecho con la confidencialidad y privacidad con que fue tratado?' },
    { key: 'higieneLimpieza', label: 'La higiene y la limpieza brindada por el hospital es:' },
    { key: 'vigilanciaInterna', label: 'La vigilancia interna del hospital es' },
    { key: 'calidadAlimentos', label: '¿Cómo calificaría la calidad de los alimentos?' },
    { key: 'servicioGeneral', label: '¿Cómo considera el servicio en general del hospital durante su estadía?' },
    { key: 'tramitesEgreso', label: 'En su alta hospitalaria los trámites de egreso le resultaron:' },
];

const ratings: CalificacionSatisfaccion[] = ['Excelente', 'Bueno', 'Regular', 'Malo', 'Pésimo'];

const QuestionRow: React.FC<{
    label: string;
    name: keyof RegistroEncuestaSatisfaccion;
    value: CalificacionSatisfaccion;
    onChange: (name: keyof RegistroEncuestaSatisfaccion, value: CalificacionSatisfaccion) => void;
}> = ({ label, name, value, onChange }) => (
    <div className="py-3 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">{label}</p>
        <div className="flex justify-between items-center">
            {ratings.map(rating => (
                 <label key={rating} className="flex flex-col items-center gap-1 cursor-pointer w-16">
                    <input 
                        type="radio" 
                        name={name} 
                        value={rating} 
                        checked={value === rating} 
                        onChange={() => onChange(name, rating)} 
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs">{rating}</span>
                </label>
            ))}
        </div>
    </div>
);


export const IndicadorSatisfaccionForm: React.FC<IndicadorSatisfaccionFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyRegistro);
    const [selectedCentral, setSelectedCentral] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCentralChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCentral(e.target.value);
        setFormData(prev => ({ ...prev, habitacion: '' }));
    };

    const handleQuestionChange = (name: keyof RegistroEncuestaSatisfaccion, value: CalificacionSatisfaccion | 'SI' | 'NO') => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: `es-${Date.now()}` });
    };

    const centralOptions = Object.keys(roomData).map(key => ({
        value: key,
        label: key.replace('Central ', '')
    }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nueva Encuesta de Satisfacción</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="paciente" placeholder="Paciente (Opcional)" value={formData.paciente} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} required className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                            
                            <select
                                name="central"
                                value={selectedCentral}
                                onChange={handleCentralChange}
                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700"
                            >
                                <option value="">Seleccionar Área</option>
                                {centralOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            <select
                                name="habitacion"
                                value={formData.habitacion}
                                onChange={handleInputChange}
                                disabled={!selectedCentral}
                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-700/50"
                            >
                                <option value="">Seleccionar Habitación</option>
                                {selectedCentral && roomData[selectedCentral as keyof typeof roomData].map(room => (
                                    <option key={room} value={room}>{room}</option>
                                ))}
                            </select>
                            
                            <input type="text" name="medico" placeholder="Médico" value={formData.medico} onChange={handleInputChange} className="md:col-span-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700" />
                        </div>
                        
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-center mb-2">PREGUNTAS</h3>
                            {questions.map(q => (
                                <QuestionRow
                                    key={q.key}
                                    label={q.label}
                                    name={q.key}
                                    value={formData[q.key] as CalificacionSatisfaccion}
                                    onChange={(name, value) => handleQuestionChange(name, value as CalificacionSatisfaccion)}
                                />
                            ))}
                            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-sm text-gray-800 dark:text-gray-200">¿Regresaría o nos recomendaría?</span>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="recomendaria" checked={formData.recomendaria === 'SI'} onChange={() => handleQuestionChange('recomendaria', 'SI')} className="w-4 h-4 text-blue-600" />
                                        <span>SI</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="recomendaria" checked={formData.recomendaria === 'NO'} onChange={() => handleQuestionChange('recomendaria', 'NO')} className="w-4 h-4 text-blue-600" />
                                        <span>NO</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                         <div>
                            <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comentarios o sugerencias adicionales</label>
                            <textarea name="comentarios" id="comentarios" value={formData.comentarios} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700"></textarea>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">Guardar Encuesta</button>
                    </div>
                </form>
            </div>
        </div>
    );
};