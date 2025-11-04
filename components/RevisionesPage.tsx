

import React, { useState } from 'react';
import { Revision } from '../types';
import { RevisionModal } from './RevisionModal';
import { PlusIcon } from './icons/PlusIcon';

interface RevisionesPageProps {
  revisiones: Revision[];
  onSave: (revision: Revision) => void;
}

const statusColors: Record<string, string> = {
    'Planificada': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    'Completada': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'Cancelada': 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
};


export const RevisionesPage: React.FC<RevisionesPageProps> = ({ revisiones, onSave }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRevision, setEditingRevision] = useState<Revision | undefined>(undefined);

    const handleOpenModal = (revision?: Revision) => {
        setEditingRevision(revision);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingRevision(undefined);
    };

    const handleSave = (revision: Revision) => {
        onSave(revision);
        handleCloseModal();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Revisiones por la Dirección</h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">
                    <PlusIcon className="w-5 h-5"/>
                    Nueva Revisión
                </button>
            </div>

             <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {['Fecha', 'Tipo', 'Responsable', 'Objetivos', 'Estado', 'Acciones'].map(header => (
                                            <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                    {revisiones.map((rev) => (
                                        <tr key={rev.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{rev.fecha}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{rev.tipo}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{rev.responsable}</td>
                                            <td className="whitespace-normal max-w-sm px-3 py-4 text-sm text-gray-500 dark:text-gray-300 truncate">{rev.objetivos}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[rev.estado]}`}>
                                                    {rev.estado}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                <button onClick={() => handleOpenModal(rev)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Ver / Editar</button>
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
                <RevisionModal 
                    revision={editingRevision}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}