import React from 'react';
import { Documento } from '../types';

interface ChangeMatrixProps {
  documents: Documento[];
}

export const ChangeMatrix: React.FC<ChangeMatrixProps> = ({ documents }) => {
  const documentsWithChanges = documents.filter(d => d.cambios && d.cambios.length > 0);

  return (
    <div className="mt-6 flow-root">
        <h2 className="text-2xl font-bold mb-4">Matriz de Cambios</h2>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Documento</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Versión</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Descripción del Cambio</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            {documentsWithChanges.flatMap((doc) => 
                                doc.cambios!.sort((a,b) => b.version - a.version).map((cambio, index) => (
                                    <tr key={`${doc.id}-${cambio.version}`}>
                                        {index === 0 && (
                                            <td rowSpan={doc.cambios!.length} className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium align-top border-r dark:border-gray-600">
                                                <div className='font-bold'>{doc.codigo}</div>
                                                <div>{doc.nombre}</div>
                                            </td>
                                        )}
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{cambio.version}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{cambio.fecha}</td>
                                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{cambio.descripcion}</td>
                                    </tr>
                                ))
                            )}
                            {documentsWithChanges.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        No hay documentos con historial de cambios.
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
