import React from 'react';
import { Documento } from '../types';

interface CorrelationMatrixProps {
  documents: Documento[];
}

export const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ documents }) => {
  const documentsWithRelations = documents.filter(d => d.relaciones && d.relaciones.length > 0);

  return (
    <div className="mt-6 flow-root">
        <h2 className="text-2xl font-bold mb-4">Matriz de Correlación</h2>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Documento Origen (Código)</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Documentos Relacionados (Código)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            {documentsWithRelations.map((doc) => (
                                <tr key={doc.id}>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{doc.codigo}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                        {doc.relaciones?.join(', ')}
                                    </td>
                                </tr>
                            ))}
                             {documentsWithRelations.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="text-center px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        No hay documentos con relaciones definidas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};
