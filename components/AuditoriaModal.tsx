import React, { useState } from 'react';
import { Auditoria, HallazgoAuditoria } from '../types';
import { XIcon } from './icons/XIcon';
import { PlusIcon } from './icons/PlusIcon';
import { HallazgoModal } from './HallazgoModal';

interface AuditoriaModalProps {
    auditoria?: Auditoria;
    onClose: () => void;
    onSave: (auditoria: Auditoria) => void;
    onGenerateAccion: (hallazgo: HallazgoAuditoria, auditoriaId: string) => void;
}

const emptyAuditoria: Omit<Auditoria, 'id' | 'codigo'> = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0],
    objetivo: '',
    alcance: '',
    criterios: 'ISO 9001:2015',
    auditorLider: '',
    equipoAuditor: [],
    estado: 'Planificada',
    hallazgos: [],
};

export const AuditoriaModal: React.FC<AuditoriaModalProps> = ({ auditoria, onClose, onSave, onGenerateAccion }) => {
    const [formData, setFormData] = useState<Auditoria>(
        auditoria || { 
            ...emptyAuditoria, 
            id: `aud-${Date.now()}`, 
            codigo: `AI-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100)).padStart(2, '0')}`
        }
    );
    const [isHallazgoModalOpen, setIsHallazgoModalOpen] = useState(false);
    const [editingHallazgo, setEditingHallazgo] = useState<HallazgoAuditoria | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleEquipoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, equipoAuditor: e.target.value.split(',').map(s => s.trim())}));
    };

    const handleOpenHallazgoModal = (hallazgo?: HallazgoAuditoria) => {
        setEditingHallazgo(hallazgo);
        setIsHallazgoModalOpen(true);
    };

    const handleSaveHallazgo = (hallazgoToSave: HallazgoAuditoria) => {
        const newHallazgos = [...formData.hallazgos];
        const index = newHallazgos.findIndex(h => h.id === hallazgoToSave.id);
        if (index > -1) {
            newHallazgos[index] = hallazgoToSave;
        } else {
            newHallazgos.push(hallazgoToSave);
        }
        setFormData(prev => ({ ...prev, hallazgos: newHallazgos }));
        setIsHallazgoModalOpen(false);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{auditoria ? `Auditoría: ${formData.codigo}` : 'Nueva Auditoría'}</h2>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XIcon className="w-6 h-6" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-3">
                                <label htmlFor="objetivo">Objetivo</label>
                                <textarea name="objetivo" value={formData.objetivo} onChange={handleChange} rows={2} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" />
                            </div>
                            <div className="lg:col-span-3">
                                <label htmlFor="alcance">Alcance</label>
                                <input name="alcance" value={formData.alcance} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" />
                            </div>
                            <div><label>Fecha Inicio</label><input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" /></div>
                            <div><label>Fecha Fin</label><input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" /></div>
                            <div><label>Estado</label><select name="estado" value={formData.estado} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm"><option>Planificada</option><option>En Progreso</option><option>Completada</option><option>Cancelada</option></select></div>
                            <div><label>Auditor Líder</label><input name="auditorLider" value={formData.auditorLider} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" /></div>
                            <div className="lg:col-span-2"><label>Equipo Auditor (separado por comas)</label><input name="equipoAuditor" value={formData.equipoAuditor.join(', ')} onChange={handleEquipoChange} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm" /></div>
                        </div>

                        <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">Hallazgos de Auditoría</h3>
                                <button type="button" onClick={() => handleOpenHallazgoModal()} className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 dark:bg-gray-600 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"><PlusIcon className="w-4 h-4" />Añadir Hallazgo</button>
                            </div>
                            <div className="space-y-2 mt-4">
                                {formData.hallazgos.map(h => (
                                    <div key={h.id} className="p-3 border rounded-md dark:border-gray-600 flex justify-between items-start">
                                        <div>
                                            <span className={`text-xs font-bold ${h.tipo.includes('Mayor') ? 'text-red-500' : h.tipo.includes('Menor') ? 'text-yellow-500' : 'text-blue-500'}`}>{h.tipo}</span>
                                            <p className="text-sm">{h.descripcion}</p>
                                            <p className="text-xs text-gray-500">{h.requisitoIncumplido} en {h.areaAuditada}</p>
                                        </div>
                                        <button type="button" onClick={() => handleOpenHallazgoModal(h)} className="text-indigo-500 text-sm font-semibold">Editar</button>
                                    </div>
                                ))}
                                {formData.hallazgos.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No se han registrado hallazgos.</p>}
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3 -mx-6 -mb-6 mt-6">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold">Guardar Auditoría</button>
                        </div>
                    </form>
                </div>
            </div>
            {isHallazgoModalOpen && (
                <HallazgoModal 
                    hallazgo={editingHallazgo}
                    onClose={() => setIsHallazgoModalOpen(false)}
                    onSave={handleSaveHallazgo}
                    onGenerateAccion={(h) => onGenerateAccion(h, formData.id)}
                />
            )}
        </>
    );
};
