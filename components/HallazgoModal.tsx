import React, { useState } from 'react';
import { HallazgoAuditoria } from '../types';
import { XIcon } from './icons/XIcon';

interface HallazgoModalProps {
    hallazgo?: HallazgoAuditoria;
    onClose: () => void;
    onSave: (hallazgo: HallazgoAuditoria) => void;
    onGenerateAccion: (hallazgo: HallazgoAuditoria) => void;
}

const emptyHallazgo: Omit<HallazgoAuditoria, 'id'> = {
    tipo: 'No Conformidad Menor',
    descripcion: '',
    evidencia: '',
    requisitoIncumplido: '',
    areaAuditada: '',
    auditorResponsable: '',
    fechaDeteccion: new Date().toISOString().split('T')[0],
};

export const HallazgoModal: React.FC<HallazgoModalProps> = ({ hallazgo, onClose, onSave, onGenerateAccion }) => {
    const [formData, setFormData] = useState<HallazgoAuditoria>(
        hallazgo || { ...emptyHallazgo, id: `hall-${Date.now()}` }
    );
    const isEditing = !!hallazgo;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleGenerateClick = () => {
        onGenerateAccion(formData);
        // Optimistically update UI
        setFormData(prev => ({...prev, accionCorrectivaId: 'Generando...'}));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-60 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{isEditing ? 'Editar Hallazgo' : 'Nuevo Hallazgo'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
                    <div>
                        <label>Tipo de Hallazgo</label>
                        <select name="tipo" value={formData.tipo} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm">
                            <option>No Conformidad Menor</option>
                            <option>No Conformidad Mayor</option>
                            <option>Observación</option>
                            <option>Oportunidad de Mejora</option>
                        </select>
                    </div>
                     <div>
                        <label>Descripción del Hallazgo</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" required />
                    </div>
                     <div>
                        <label>Evidencia Objetiva</label>
                        <textarea name="evidencia" value={formData.evidencia} onChange={handleChange} rows={2} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div><label>Requisito Incumplido</label><input name="requisitoIncumplido" value={formData.requisitoIncumplido} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" /></div>
                        <div><label>Área Auditada</label><input name="areaAuditada" value={formData.areaAuditada} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" required /></div>
                        <div><label>Auditor Responsable</label><input name="auditorResponsable" value={formData.auditorResponsable} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" required /></div>
                        <div><label>Fecha de Detección</label><input type="date" name="fechaDeteccion" value={formData.fechaDeteccion} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" /></div>
                    </div>

                    {formData.tipo.startsWith('No Conformidad') && (
                        <div className="pt-4 border-t dark:border-gray-600">
                             <label className="font-semibold">Acción Correctiva</label>
                             {formData.accionCorrectivaId ? (
                                <p className="mt-2 text-sm p-3 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-md">
                                    Acción Correctiva vinculada: <strong>{formData.accionCorrectivaId}</strong>
                                </p>
                             ) : (
                                <button type="button" onClick={handleGenerateClick} className="mt-2 w-full px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold hover:bg-orange-600">
                                    Generar Acción Correctiva
                                </button>
                             )}
                        </div>
                    )}

                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3 -mx-6 -mb-6 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold">Guardar Hallazgo</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
