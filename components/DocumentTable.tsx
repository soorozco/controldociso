import React, { useState } from 'react';
import { Documento } from '../types';
import { FilterControls } from './FilterControls';
import { EditDocumentModal } from './EditDocumentModal';
import { useDocuments } from '../hooks/useDocuments';
import { ViewDocumentModal } from './ViewDocumentModal';

interface DocumentTableProps {
    documents: Documento[];
    onSave: (documento: Documento) => void;
    onNewDocument: () => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onSave, onNewDocument }) => {
    const {
        paginatedDocuments,
        areas,
        docTypes,
        ...filterControlsProps
    } = useDocuments(documents);

    const [editingDocument, setEditingDocument] = useState<Documento | null>(null);
    const [viewingDocument, setViewingDocument] = useState<Documento | null>(null);

    const handleEdit = (documento: Documento) => {
        setEditingDocument(documento);
    };
    
    const handleSave = (updatedDocument: Documento) => {
        onSave(updatedDocument);
        setEditingDocument(null);
    };

    return (
        <div>
            <FilterControls 
                {...filterControlsProps} 
                areas={areas} 
                docTypes={docTypes}
                onNewButtonClick={onNewDocument}
                newButtonLabel="Nuevo documento"
             />
            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {['Código', 'Nombre', 'Versión', 'Fecha Aprobación', 'Área', 'Tipo Documento', 'Estado', 'Acciones'].map(header => (
                                            <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                    {paginatedDocuments.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.codigo}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{doc.nombre}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.version}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.fechaAprobacion}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.area}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.tipoDocumento}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doc.estado === 'Vigente' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                                    {doc.estado}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                <button onClick={() => setViewingDocument(doc)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200">Ver</button>
                                                <button onClick={() => handleEdit(doc)} className="ml-4 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {editingDocument && (
                <EditDocumentModal 
                    documento={editingDocument} 
                    onClose={() => setEditingDocument(null)}
                    onSave={handleSave}
                    areas={areas}
                    docTypes={docTypes}
                />
            )}
            {viewingDocument && (
                <ViewDocumentModal 
                    documento={viewingDocument}
                    onClose={() => setViewingDocument(null)}
                />
            )}
        </div>
    );
}