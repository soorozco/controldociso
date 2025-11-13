import React, { useState } from 'react';
import { AccionCorrectiva } from '../types';
import { AccionCorrectivaModal } from './AccionCorrectivaModal';
import { PlusIcon } from './icons/PlusIcon';
import { useAccionesCorrectivas } from '../hooks/useAccionesCorrectivas';
import { FilterControlsAcciones } from './FilterControlsAcciones';
import { AccionesCorrectivasSummary } from './AccionesCorrectivasSummary';
import { areaCodes } from '../data/codingRules';


interface AccionesCorrectivasPageProps {
  acciones: AccionCorrectiva[];
  onSave: (accion: AccionCorrectiva) => void;
  allAcciones: AccionCorrectiva[]; // Pass all actions for code generation
}

const statusColors: Record<string, string> = {
    'Abierta': 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    'En Proceso': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    'Cerrada': 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    'Verificada': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
};


export const AccionesCorrectivasPage: React.FC<AccionesCorrectivasPageProps> = ({ acciones, onSave, allAcciones }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccion, setEditingAccion] = useState<AccionCorrectiva | undefined>(undefined);
    const [showSummary, setShowSummary] = useState(false);

    const {
        paginatedAcciones,
        areas,
        statuses,
        ...filterControlsProps
    } = useAccionesCorrectivas(acciones);

    const handleOpenModal = (accion?: AccionCorrectiva) => {
        setEditingAccion(accion);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAccion(undefined);
    };

    const handleSave = (accion: AccionCorrectiva) => {
        onSave(accion);
        handleCloseModal();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Acciones Correctivas y Preventivas</h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">
                    <PlusIcon className="w-5 h-5"/>
                    Nueva Acción
                </button>
            </div>

            <FilterControlsAcciones
                {...filterControlsProps} 
                areas={areas} // Filtered areas from hook
                statuses={statuses} // Filtered statuses from hook
                onNewButtonClick={() => handleOpenModal()}
                newButtonLabel="Nueva Acción"
                onToggleSummary={() => setShowSummary(prev => !prev)}
                showSummary={showSummary}
            />
            
            {showSummary ? (
                <AccionesCorrectivasSummary acciones={acciones} /> // Use all actions for summary calculations
            ) : (
                <div className="mt-6 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:-px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            {['Código', 'Descripción', 'Área', 'Responsable', 'Fecha Apertura', 'Estado', 'Acciones'].map(header => (
                                                <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                        {paginatedAcciones.map((ac) => (
                                            <tr key={ac.id}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{ac.codigo}</td>
                                                <td className="whitespace-normal max-w-sm px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{ac.descripcion}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{ac.area}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{ac.responsableApertura}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{ac.fechaApertura}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[ac.estado]}`}>
                                                        {ac.estado}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                    <button onClick={() => handleOpenModal(ac)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Ver / Editar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {isModalOpen && (
                <AccionCorrectivaModal 
                    accion={editingAccion}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    allAcciones={allAcciones} // Pass all actions for code generation
                    availableAreas={Object.keys(areaCodes)} // Pass all possible areas for the dropdown
                />
            )}
        </div>
    );
}