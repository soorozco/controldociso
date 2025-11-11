
import React from 'react';
import { Oficio } from '../types';
import { useDocuments } from '../hooks/useDocuments'; // Reusing generic hook for filtering/pagination
import { FilterControls } from './FilterControls';
import { PrintableOficio } from './PrintableOficio';

interface OficioTableProps {
    oficios: Oficio[];
    onEdit: (oficio: Oficio) => void;
}

export const OficioTable: React.FC<OficioTableProps> = ({ oficios, onEdit }) => {
    const {
        paginatedDocuments: paginatedOficios,
        searchTerm, onSearchChange,
        itemsPerPage, onItemsPerPageChange,
        currentPage, totalPages, onPageChange,
        filteredCount,
    } = useDocuments(oficios);

    // FilterControls needs these, but Oficios don't directly use them for now.
    // Providing dummy values or a more specialized hook could be considered for very complex cases.
    const dummyAreas: string[] = [];
    const dummyDocTypes: string[] = [];
    const dummySelectedArea = 'all';
    const dummyOnAreaChange = () => {};
    const dummySelectedDocType = 'all';
    const dummyOnDocTypeChange = () => {};
    const dummyIncludeObsolete = false;
    const dummyOnObsoleteChange = () => {};
    const dummyOnNewButtonClick = () => {}; // Handled in OficiosPage
    const dummyNewButtonLabel = '';

    const handleGeneratePdf = (oficio: Oficio) => {
        // Open a new window for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write('<!DOCTYPE html><html><head><title>Oficio</title>');
            printWindow.document.write('<style>');
            printWindow.document.write(`
                body { font-family: 'Arial', sans-serif; margin: 2cm; color: #333; }
                .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2cm; }
                .header .logo { height: 50px; }
                .oficio-no { font-size: 1.2em; font-weight: bold; }
                .date { text-align: right; margin-bottom: 1cm; }
                .recipient { margin-bottom: 1cm; }
                .recipient p { margin: 0; line-height: 1.4; }
                .subject { font-weight: bold; margin-bottom: 1cm; }
                .body-content { line-height: 1.6; text-align: justify; margin-bottom: 2cm; white-space: pre-wrap; }
                .footer { text-align: center; margin-top: 3cm; }
                .firmante { font-weight: bold; border-top: 1px solid #000; display: inline-block; padding-top: 5px; margin-top: 1cm;}
                @media print {
                    .header { margin-bottom: 1.5cm; }
                    .date { margin-bottom: 0.8cm; }
                    .recipient { margin-bottom: 0.8cm; }
                    .subject { margin-bottom: 0.8cm; }
                    .body-content { margin-bottom: 1.5cm; }
                    .footer { margin-top: 2cm; }
                }
            `);
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<div id="printable-oficio-root"></div>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();

            const rootDiv = printWindow.document.getElementById('printable-oficio-root');
            if (rootDiv) {
                // Use ReactDOM to render the PrintableOficio component into the new window
                // This requires importing ReactDOM and creating a root
                import('react-dom/client').then(ReactDOM => {
                    const root = ReactDOM.createRoot(rootDiv);
                    root.render(<PrintableOficio oficio={oficio} />);
                    // A small delay before printing to ensure content is rendered
                    setTimeout(() => {
                        printWindow.focus(); // Focus the new window
                        printWindow.print(); // Trigger the print dialog
                        // printWindow.close(); // Optionally close after printing
                    }, 500); 
                });
            }
        }
    };

    return (
        <div>
            {/* Filter controls, re-using the existing component for layout consistency */}
            <FilterControls
                searchTerm={searchTerm} onSearchChange={onSearchChange}
                areas={dummyAreas} selectedArea={dummySelectedArea} onAreaChange={dummyOnAreaChange}
                docTypes={dummyDocTypes} selectedDocType={dummySelectedDocType} onDocTypeChange={dummyOnDocTypeChange}
                includeObsolete={dummyIncludeObsolete} onObsoleteChange={dummyOnObsoleteChange}
                filteredCount={filteredCount}
                itemsPerPage={itemsPerPage} onItemsPerPageChange={onItemsPerPageChange}
                currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}
                onNewButtonClick={dummyOnNewButtonClick} // New button handled by OficiosPage
                newButtonLabel={dummyNewButtonLabel} // New button handled by OficiosPage
            />

            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {['No. Oficio', 'Fecha', 'Destinatario', 'Asunto', 'Estado', 'Acciones'].map(header => (
                                            <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                    {paginatedOficios.map((oficio) => (
                                        <tr key={oficio.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{oficio.oficioNo}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{oficio.fechaEmision}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{oficio.destinatarioNombre}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{oficio.destinatarioCargo}</p>
                                            </td>
                                            <td className="whitespace-normal max-w-sm px-3 py-4 text-sm text-gray-500 dark:text-gray-300 truncate">{oficio.asunto}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    oficio.estado === 'Emitido' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                                    oficio.estado === 'Borrador' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                                                    'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                }`}>
                                                    {oficio.estado}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                <button onClick={() => onEdit(oficio)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Ver / Editar</button>
                                                <button onClick={() => handleGeneratePdf(oficio)} className="ml-4 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200">Generar PDF</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
