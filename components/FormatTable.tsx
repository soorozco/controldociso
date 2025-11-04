import React, { useState } from 'react';
import { Formato, Documento } from '../types';
import { FilterControls } from './FilterControls';
import { EditDocumentModal } from './EditDocumentModal';
import { useDocuments } from '../hooks/useDocuments';
import { ViewDocumentModal } from './ViewDocumentModal';
import { NewFormatModal } from './NewFormatModal';

interface FormatTableProps {
    formats: Formato[];
    onSave: (formato: Formato) => void;
    documents: Documento[];
}

export const FormatTable: React.FC<FormatTableProps> = ({ formats, onSave, documents }) => {
    const {
        paginatedDocuments: paginatedFormats,
        areas,
        docTypes,
        ...filterControlsProps
    } = useDocuments<Formato>(formats);

    const [editingFormat, setEditingFormat] = useState<Formato | null>(null);
    const [viewingFormat, setViewingFormat] = useState<Formato | null>(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const handleEdit = (formato: Formato) => {
        setEditingFormat(formato);
    };
    
    const handleSaveEdit = (updatedDocument: Documento) => {
        onSave({ ...editingFormat, ...updatedDocument } as Formato);
        setEditingFormat(null);
    };
    
    const handleNewFormat = () => {
        setIsNewModalOpen(true);
    };

    const handleSaveNewFormat = (newFormat: Formato) => {
        onSave(newFormat);
        setIsNewModalOpen(false);
    };

    return (
        <div>
            <FilterControls 
                {...filterControlsProps} 
                areas={areas} 
                docTypes={docTypes} 
                onNewButtonClick={handleNewFormat}
                newButtonLabel="Nuevo formato"
            />
            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {['Código', 'Nombre', 'Versión', 'Fecha Aprobación', 'Área', 'Documento Padre', 'Estado', 'Acciones'].map(header => (
                                            <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                    {paginatedFormats.map((format) => (
                                        <tr key={format.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{format.codigo}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{format.nombre}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{format.version}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{format.fechaAprobacion}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{format.area}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{format.documentoPadreCodigo}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${format.estado === 'Vigente' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                                    {format.estado}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                <button onClick={() => setViewingFormat(format)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200">Ver</button>
                                                <button onClick={() => handleEdit(format)} className="ml-4 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {editingFormat && (
                <EditDocumentModal 
                    documento={editingFormat} 
                    onClose={() => setEditingFormat(null)}
                    onSave={handleSaveEdit}
                    areas={areas}
                    docTypes={docTypes}
                />
            )}
             {viewingFormat && (
                <ViewDocumentModal 
                    documento={viewingFormat}
                    onClose={() => setViewingFormat(null)}
                />
            )}
            {isNewModalOpen && (
                <NewFormatModal 
                    onClose={() => setIsNewModalOpen(false)}
                    onSave={handleSaveNewFormat}
                    areas={areas}
                    docTypes={docTypes}
                    documentos={documents}
                />
            )}
        </div>
    );
}