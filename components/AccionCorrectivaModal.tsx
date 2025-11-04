import React, { useState, useEffect } from 'react';
import { AccionCorrectiva, Accion } from '../types';
import { XIcon } from './icons/XIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface AccionCorrectivaModalProps {
    accion?: AccionCorrectiva;
    onClose: () => void;
    onSave: (accion: AccionCorrectiva) => void;
}

const emptyAccion: Omit<AccionCorrectiva, 'id' | 'codigo'> = {
    descripcion: '',
    causaRaiz: '',
    acciones: [],
    responsableApertura: '',
    fechaApertura: new Date().toISOString().split('T')[0],
    estado: 'Abierta',
};

export const AccionCorrectivaModal: React.FC<AccionCorrectivaModalProps> = ({ accion, onClose, onSave }) => {
    const [formData, setFormData] = useState<AccionCorrectiva>(() => 
        accion || { 
            ...emptyAccion, 
            id: `ac-${Date.now()}`, 
            codigo: `AC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
        }
    );
    const isEditing = !!accion;

    useEffect(() => {
        if (accion) {
            setFormData(accion);
        } else {
            setFormData({
                ...emptyAccion,
                id: `ac-${Date.now()}`,
                // A better code generation logic would be needed in a real app
                codigo: `AC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
            });
        }
    }, [accion]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleActionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newActions = [...formData.acciones];
        const actionToUpdate = { ...newActions[index] };
        
        if (type === 'checkbox') {
            actionToUpdate.completada = checked;
        } else if (name === 'descripcion') {
            actionToUpdate.descripcion = value;
        } else if (name === 'responsable') {
            actionToUpdate.responsable = value;
        } else if (name === 'fechaPrevista') {
            actionToUpdate.fechaPrevista = value;
        }

        newActions[index] = actionToUpdate;
        setFormData(prev => ({ ...prev, acciones: newActions }));
    };

    const addAction = () => {
        setFormData(prev => ({
            ...prev,
            acciones: [...prev.acciones, { descripcion: '', responsable: '', fechaPrevista: '', completada: false }]
        }));
    };

    const removeAction = (index: number) => {
        setFormData(prev => ({
            ...prev,
            acciones: prev.acciones.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{isEditing ? `Editar Acción Correctiva: ${formData.codigo}` : 'Nueva Acción Correctiva'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="md:col-span-2">
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción de la No Conformidad</label>
                            <textarea name="descripcion" id="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="causaRaiz" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Análisis de Causa Raíz</label>
                            <textarea name="causaRaiz" id="causaRaiz" value={formData.causaRaiz} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required></textarea>
                        </div>
                        <div>
                            <label htmlFor="responsableApertura" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Responsable Apertura</label>
                            <input type="text" name="responsableApertura" id="responsableApertura" value={formData.responsableApertura} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                        </div>
                        <div>
                            <label htmlFor="fechaApertura" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Apertura</label>
                            <input type="date" name="fechaApertura" id="fechaApertura" value={formData.fechaApertura} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                        </div>
                        <div>
                            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                            <select name="estado" id="estado" value={formData.estado} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option>Abierta</option>
                                <option>En Proceso</option>
                                <option>Cerrada</option>
                                <option>Verificada</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fechaCierre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Cierre</label>
                            <input type="date" name="fechaCierre" id="fechaCierre" value={formData.fechaCierre || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 pt-2 border-t border-gray-200 dark:border-gray-700">Plan de Acciones</h3>
                            {formData.acciones.map((action, index) => (
                                <div key={index} className="grid grid-cols-12 gap-x-4 gap-y-2 items-start mb-3 p-3 border border-gray-200 dark:border-gray-600 rounded-md">
                                    <div className="col-span-12 sm:col-span-5">
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Descripción Acción</label>
                                        <input type="text" name="descripcion" value={action.descripcion} onChange={e => handleActionChange(index, e)} className="mt-1 block w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm sm:text-sm bg-white dark:bg-gray-700" required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Responsable</label>
                                        <input type="text" name="responsable" value={action.responsable} onChange={e => handleActionChange(index, e)} className="mt-1 block w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm sm:text-sm bg-white dark:bg-gray-700" required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Fecha Prevista</label>
                                        <input type="date" name="fechaPrevista" value={action.fechaPrevista} onChange={e => handleActionChange(index, e)} className="mt-1 block w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm sm:text-sm bg-white dark:bg-gray-700" required />
                                    </div>
                                    <div className="col-span-10 sm:col-span-1 flex flex-col items-center justify-end h-full">
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Hecho</label>
                                        <input type="checkbox" name="completada" checked={action.completada} onChange={e => handleActionChange(index, e)} className="mt-2 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 flex items-end h-full">
                                        <button type="button" onClick={() => removeAction(index)} className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addAction} className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-400 dark:border-gray-500 text-sm font-semibold text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                                <PlusIcon className="w-4 h-4" />
                                Añadir Acción
                            </button>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
