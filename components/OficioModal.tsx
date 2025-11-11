
import React, { useState, useEffect } from 'react';
import { Oficio } from '../types';
import { XIcon } from './icons/XIcon';
import { getNextOficioNumber } from '../data/documents';

interface OficioModalProps {
    oficio?: Oficio;
    onClose: () => void;
    onSave: (oficio: Oficio) => void;
}

const emptyOficio: Omit<Oficio, 'id'> = {
    oficioNo: '',
    fechaEmision: new Date().toISOString().split('T')[0],
    destinatarioNombre: '',
    destinatarioCargo: '',
    destinatarioOrganizacion: '',
    asunto: '',
    cuerpo: '',
    firmante: '',
    estado: 'Borrador',
};

export const OficioModal: React.FC<OficioModalProps> = ({ oficio, onClose, onSave }) => {
    const [formData, setFormData] = useState<Oficio>(() => 
        oficio || { 
            ...emptyOficio, 
            id: `of-${Date.now()}`,
            oficioNo: getNextOficioNumber([]) // Temporarily pass empty array; actual generation happens in OficiosPage
        }
    );
    const isEditing = !!oficio;

    useEffect(() => {
        if (oficio) {
            setFormData(oficio);
        } else {
            // This case should be handled by OficiosPage when passing a new oficio to the modal
            // but providing a fallback.
            setFormData({
                ...emptyOficio,
                id: `of-${Date.now()}`,
                oficioNo: `OF-${new Date().getFullYear()}-XXX`, // Placeholder if not pre-generated
            });
        }
    }, [oficio]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{isEditing ? `Editar Oficio: ${formData.oficioNo}` : 'Nuevo Oficio'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <label htmlFor="oficioNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">No. Oficio</label>
                            <input type="text" name="oficioNo" id="oficioNo" value={formData.oficioNo} readOnly className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                        </div>
                        <div>
                            <label htmlFor="fechaEmision" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Emisión</label>
                            <input type="date" name="fechaEmision" id="fechaEmision" value={formData.fechaEmision} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                        </div>
                        <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Destinatario</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="destinatarioNombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                                    <input type="text" name="destinatarioNombre" id="destinatarioNombre" value={formData.destinatarioNombre} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                                </div>
                                <div>
                                    <label htmlFor="destinatarioCargo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cargo</label>
                                    <input type="text" name="destinatarioCargo" id="destinatarioCargo" value={formData.destinatarioCargo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                                </div>
                                <div>
                                    <label htmlFor="destinatarioOrganizacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organización</label>
                                    <input type="text" name="destinatarioOrganizacion" id="destinatarioOrganizacion" value={formData.destinatarioOrganizacion} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asunto</label>
                            <input type="text" name="asunto" id="asunto" value={formData.asunto} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="cuerpo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuerpo del Oficio</label>
                            <textarea name="cuerpo" id="cuerpo" value={formData.cuerpo} onChange={handleChange} rows={10} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required></textarea>
                        </div>
                        <div>
                            <label htmlFor="firmante" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Firmante</label>
                            <input type="text" name="firmante" id="firmante" value={formData.firmante} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                        </div>
                        <div>
                            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                            <select name="estado" id="estado" value={formData.estado} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="Borrador">Borrador</option>
                                <option value="Emitido">Emitido</option>
                                <option value="Anulado">Anulado</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">Guardar Oficio</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
