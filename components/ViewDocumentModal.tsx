import React from 'react';
import { Documento, Formato, ProcesoPaso, ControlCambio, Autorizacion } from '../types';
import { XIcon } from './icons/XIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

interface ViewDocumentModalProps {
    documento: Documento | Formato;
    onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null; className?: string }> = ({ label, value, className }) => (
    value ? <div className={className}>
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h4>
        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{value}</p>
    </div> : null
);

const Section: React.FC<{ title: string; children: React.ReactNode; hasData?: boolean }> = ({ title, children, hasData = true }) => {
    if (!hasData) return null;
    return (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
            {children}
        </div>
    );
};


export const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ documento, onClose }) => {
    
    const isFormato = 'documentoPadreCodigo' in documento;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{documento.nombre}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{documento.codigo} - v{documento.version}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 -mt-1">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                         <div>
                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${documento.estado === 'Vigente' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                {documento.estado}
                            </span>
                        </div>
                        <a href={`/${documento.archivo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                            <DocumentTextIcon className="w-5 h-5"/>
                            <span>Abrir archivo</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                        <DetailItem label="Fecha Aprobación" value={documento.fechaAprobacion} />
                        <DetailItem label="Fecha Emisión" value={documento.fechaEmision} />
                        <DetailItem label="Próx. Revisión" value={documento.fechaRevision} />
                        <DetailItem label="Área" value={documento.area} />
                        <DetailItem label="Tipo Documento" value={documento.tipoDocumento} />
                         {isFormato && <DetailItem label="Documento Padre" value={(documento as Formato).documentoPadreCodigo} />}
                    </div>

                    <Section title="Objetivo y Alcance" hasData={!!documento.objetivo || !!documento.alcance}>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{documento.objetivo}</p>
                        {documento.alcance && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{documento.alcance}</p>}
                    </Section>
                    
                     <Section title="Responsabilidades" hasData={!!documento.responsabilidades}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <DetailItem label="Actualización" value={documento.responsabilidades?.Actualizacion} />
                            <DetailItem label="Ejecución" value={documento.responsabilidades?.Ejecucion} />
                            <DetailItem label="Supervisión" value={documento.responsabilidades?.Supervision} />
                        </div>
                    </Section>

                    <Section title="Desarrollo del Proceso" hasData={!!documento.desarrolloProceso && documento.desarrolloProceso.length > 0}>
                       <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="text-left text-gray-500 dark:text-gray-400">
                                    <tr>
                                        <th className="p-2 font-medium w-8">No.</th>
                                        <th className="p-2 font-medium w-1/4">Responsable</th>
                                        <th className="p-2 font-medium">Actividad</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {documento.desarrolloProceso?.map((paso: ProcesoPaso) => (
                                        <tr key={paso.No}>
                                            <td className="p-2 align-top">{paso.No}</td>
                                            <td className="p-2 align-top font-medium text-gray-800 dark:text-gray-200">{paso.Responsable}</td>
                                            <td className="p-2 align-top whitespace-pre-wrap">{paso.Actividad}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Section>
                    
                    <Section title="Control de Cambios" hasData={!!documento.controlCambios && documento.controlCambios.length > 0}>
                       <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="text-left text-gray-500 dark:text-gray-400">
                                    <tr>
                                        <th className="p-2 font-medium">No.</th>
                                        <th className="p-2 font-medium">Fecha</th>
                                        <th className="p-2 font-medium">Descripción del Cambio</th>
                                        <th className="p-2 font-medium">Realizado por</th>
                                        <th className="p-2 font-medium">Aprobado por</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {documento.controlCambios?.map((cambio: ControlCambio) => (
                                        <tr key={cambio.Numero}>
                                            <td className="p-2 align-top">{cambio.Numero}</td>
                                            <td className="p-2 align-top">{cambio.Fecha}</td>
                                            <td className="p-2 align-top whitespace-pre-wrap">{cambio['Descripcion del Cambio']}</td>
                                            <td className="p-2 align-top">{cambio['Realizado por']}</td>
                                            <td className="p-2 align-top">{cambio['Aprobado por']}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Section>
                    
                    <Section title="Autorizaciones" hasData={!!documento.autorizaciones && documento.autorizaciones.length > 0}>
                        {documento.autorizaciones?.map((auth: Autorizacion, index: number) => (
                             <div key={index} className="grid grid-cols-3 gap-4 text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{auth.Elaboro}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{auth.CargoElaboro}</p>
                                    <p className="mt-2 text-sm font-medium">Elaboró</p>
                                </div>
                                 <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{auth.Reviso}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{auth.CargoReviso}</p>
                                    <p className="mt-2 text-sm font-medium">Revisó</p>
                                </div>
                                 <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{auth.Autorizo}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{auth.CargoAutorizo}</p>
                                    <p className="mt-2 text-sm font-medium">Autorizó</p>
                                </div>
                            </div>
                        ))}
                    </Section>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};