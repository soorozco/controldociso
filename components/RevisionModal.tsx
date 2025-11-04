

import React, { useState, useEffect } from 'react';
import { Revision } from '../types';
import { XIcon } from './icons/XIcon';

interface RevisionModalProps {
    revision?: Revision;
    onClose: () => void;
    onSave: (revision: Revision) => void;
}

const emptyRevision: Omit<Revision, 'id'> = {
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'Dirección',
    responsable: '',
    objetivos: '',
    conclusiones: '',
    estado: 'Planificada',
    estadoAccionesAnteriores: '',
    resumenCambios: '',
    desempenoEficaciaSGC: '',
    cumplimientoObjetivosPrevios: '',
    seguimientoAuditorias: '',
    adecuacionRecursos: '',
    eficaciaRiesgos: '',
    oportunidadesMejoraAcciones: '',
};

export const RevisionModal: React.FC<RevisionModalProps> = ({ revision, onClose, onSave }) => {
    const [formData, setFormData] = useState<Revision>(() =>
        revision || {
            ...emptyRevision,
            id: `rev-${Date.now()}`,
        }
    );
    const isEditing = !!revision;

    useEffect(() => {
        if (revision) {
            setFormData(revision);
        } else {
             setFormData({
                ...emptyRevision,
                id: `rev-${Date.now()}`,
            });
        }
    }, [revision]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const renderTextarea = (name: keyof Revision, label: string, rows: number = 3) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <textarea 
                name={name} 
                id={name} 
                value={formData[name] as string || ''} 
                onChange={handleChange} 
                rows={rows} 
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            ></textarea>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{isEditing ? 'Editar Revisión por la Dirección' : 'Nueva Revisión por la Dirección'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
                            <input type="date" name="fecha" id="fecha" value={formData.fecha} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                        </div>
                        <div>
                            <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Responsable</label>
                            <input type="text" name="responsable" id="responsable" value={formData.responsable} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                        </div>
                        <div>
                            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Revisión</label>
                            <select name="tipo" id="tipo" value={formData.tipo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option>Dirección</option>
                                <option>Interna</option>
                                <option>Externa</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                            <select name="estado" id="estado" value={formData.estado} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option>Planificada</option>
                                <option>Completada</option>
                                <option>Cancelada</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Entradas de la Revisión</h3>
                            <div className="mt-4 space-y-4">
                                {renderTextarea('objetivos', 'Objetivos de la Revisión', 2)}
                                {renderTextarea('estadoAccionesAnteriores', '1. Estado de las acciones de las revisiones por la dirección previas')}
                                {renderTextarea('resumenCambios', '2. Cambios en las cuestiones externas e internas que son pertinentes al SGC')}
                                {renderTextarea('desempenoEficaciaSGC', '3. Desempeño y eficacia del SGC (Incl. satisfacción del cliente, retroalimentación)')}
                                {renderTextarea('cumplimientoObjetivosPrevios', '4. Grado en que se han logrado los objetivos de la calidad')}
                                {renderTextarea('seguimientoAuditorias', '5. Resultados de seguimiento de auditorías, no conformidades y acciones correctivas')}
                                {renderTextarea('adecuacionRecursos', '6. Adecuación de los recursos')}
                                {renderTextarea('eficaciaRiesgos', '7. Eficacia de las acciones tomadas para abordar los riesgos y las oportunidades')}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Salidas de la Revisión</h3>
                            <div className="mt-4 space-y-4">
                               {renderTextarea('oportunidadesMejoraAcciones', '1. Oportunidades de mejora y acciones a tomar')}
                               {renderTextarea('conclusiones', '2. Conclusiones y resumen general', 4)}
                            </div>
                        </div>
                    </div>


                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3 -mx-6 -mb-6 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};