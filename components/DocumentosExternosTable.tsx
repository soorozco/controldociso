
import React, { useState } from 'react';
import { DocumentoExterno } from '../types';
import { EditDocumentoExternoModal } from './EditDocumentoExternoModal';
import { PlusIcon } from './icons/PlusIcon';

interface DocumentosExternosTableProps {
    documentos: DocumentoExterno[];
    onSave: (documento: DocumentoExterno) => void;
}

export const DocumentosExternosTable: React.FC<DocumentosExternosTableProps> = ({ documentos, onSave }) => {
    const [editingDocument, setEditingDocument] = useState<DocumentoExterno | null>(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    
    const allAreas = [...new Set(documentos.map(d => d.areaResponsable))];
    const allDocTypes = [...new Set(documentos.map(d => d.tipoDocumento))];

    const handleEdit = (documento: DocumentoExterno) => {
        setEditingDocument(documento);
    };
    
    const handleSave = (updatedDocument: DocumentoExterno) => {
        onSave(updatedDocument);
        setEditingDocument(null);
        setIsNewModalOpen(false);
    };
    
    const handleNew = () => {
        setEditingDocument(null);
        setIsNewModalOpen(true);
    }
    
    const handleCloseModal = () => {
        setEditingDocument(null);
        setIsNewModalOpen(false);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Vigente': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'Obsoleto': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
            case 'En revisión': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
        }
    }


    return (
        <div>
             <div className="flex justify-end items-center mb-4">
                <button 
                    onClick={handleNew}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">
                    <PlusIcon className="w-5 h-5"/>
                    Nuevo Documento Externo
                </button>
            </div>
            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {['Código', 'Nombre', 'Tipo', 'Fuente/Emisor', 'Versión', 'Estado', 'Área Resp.', 'Próx. Revisión', 'Acciones'].map(header => (
                                            <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                    {documentos.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.codigo}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{doc.nombre}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.tipoDocumento}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.fuenteEmisor}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.version}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.estado)}`}>
                                                    {doc.estado}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.areaResponsable}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{doc.proximaRevisionProgramada}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                <button onClick={() => handleEdit(doc)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Ver / Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {(editingDocument || isNewModalOpen) && (
                <EditDocumentoExternoModal 
                    documento={editingDocument} 
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    areas={allAreas}
                    docTypes={allDocTypes}
                />
            )}
        </div>
    );
}
