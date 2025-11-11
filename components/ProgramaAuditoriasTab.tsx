import React, { useState } from 'react';
import { Auditoria, HallazgoAuditoria } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { AuditoriaModal } from './AuditoriaModal';

interface ProgramaAuditoriasTabProps {
  auditorias: Auditoria[];
  onSave: (auditoria: Auditoria) => void;
  onGenerateAccion: (hallazgo: HallazgoAuditoria, auditoriaId: string) => void;
}

const statusColors: Record<string, string> = {
    'Planificada': 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    'En Progreso': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    'Completada': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'Cancelada': 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
};

export const ProgramaAuditoriasTab: React.FC<ProgramaAuditoriasTabProps> = ({ auditorias, onSave, onGenerateAccion }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAuditoria, setEditingAuditoria] = useState<Auditoria | undefined>(undefined);

    const handleOpenModal = (auditoria?: Auditoria) => {
        setEditingAuditoria(auditoria);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAuditoria(undefined);
    };

    const handleSave = (auditoria: Auditoria) => {
        onSave(auditoria);
        handleCloseModal();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Programa de Auditorías</h2>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">
                    <PlusIcon className="w-5 h-5"/>
                    Nueva Auditoría
                </button>
            </div>

            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {['Código', 'Fechas', 'Alcance', 'Auditor Líder', 'Estado', 'Hallazgos', 'Acciones'].map(header => (
                                            <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                    {auditorias.map((aud) => (
                                        <tr key={aud.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{aud.codigo}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{aud.fechaInicio} al {aud.fechaFin}</td>
                                            <td className="whitespace-normal max-w-xs px-3 py-4 text-sm text-gray-500 dark:text-gray-300 truncate">{aud.alcance}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{aud.auditorLider}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[aud.estado]}`}>
                                                    {aud.estado}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{aud.hallazgos.length}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                <button onClick={() => handleOpenModal(aud)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Ver / Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <AuditoriaModal 
                    auditoria={editingAuditoria}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    onGenerateAccion={onGenerateAccion}
                />
            )}
        </div>
    );
}