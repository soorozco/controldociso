import React, { useState, useRef } from 'react';
import { Documento, ProcesoPaso, ControlCambio, Autorizacion } from '../types';
import { XIcon } from './icons/XIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface NewDocumentModalProps {
    onClose: () => void;
    onSave: (documento: Documento) => void;
    areas: string[];
    docTypes: string[];
}

const emptyDocument: Omit<Documento, 'id'> = {
    codigo: '',
    nombre: '',
    version: 1,
    fechaAprobacion: new Date().toISOString().split('T')[0],
    area: '',
    tipoDocumento: 'Procedimiento',
    estado: 'Vigente',
    archivo: '',
    fechaEmision: new Date().toISOString().split('T')[0],
    fechaRevision: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0],
    objetivo: '',
    alcance: '',
    responsabilidades: { Actualizacion: '', Ejecucion: '', Supervision: '' },
    desarrolloProceso: [],
    gestionRiesgos: { ponderacionRiesgos: [], barrerasSeguridad: [] },
    documentosReferencia: [],
    controlCambios: [],
    autorizaciones: [{ Elaboro: '', Reviso: '', Autorizo: '', CargoElaboro: '', CargoReviso: '', CargoAutorizo: '' }],
};

const parseDate = (dateString: string | undefined): string | undefined => {
    if (!dateString || typeof dateString !== 'string') return undefined;
    const trimmedDate = dateString.trim();

    // Format: "28 AGO 2024"
    const monthMap: { [key: string]: string } = {
        ENE: '01', FEB: '02', MAR: '03', ABR: '04', MAY: '05', JUN: '06',
        JUL: '07', AGO: '08', SEP: '09', OCT: '10', NOV: '11', DIC: '12'
    };
    const partsMon = trimmedDate.split(' ');
    if (partsMon.length === 3 && monthMap[partsMon[1].toUpperCase()]) {
        const day = partsMon[0].padStart(2, '0');
        const month = monthMap[partsMon[1].toUpperCase()];
        const year = partsMon[2];
        const d = new Date(`${year}-${month}-${day}T12:00:00Z`); // use UTC to avoid timezone issues
        if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
    }

    // Format: "28/08/2024"
    const partsSlash = trimmedDate.split('/');
    if (partsSlash.length === 3) {
        const [day, month, year] = partsSlash;
        const d = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T12:00:00Z`); // use UTC to avoid timezone issues
        if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
    }
    
    // Try native Date object for formats like YYYY-MM-DD
    const d = new Date(`${trimmedDate}T12:00:00Z`);
    if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
    }
    
    console.warn(`Could not parse date: "${trimmedDate}"`);
    return undefined; // Indicate failure
};


export const NewDocumentModal: React.FC<NewDocumentModalProps> = ({ onClose, onSave, areas, docTypes }) => {
    const [formData, setFormData] = useState<Documento>({ ...emptyDocument, id: `doc-${Date.now()}` });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (section: keyof Documento, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(prev[section] as object),
                [field]: value,
            },
        }));
    };
    
    const handleDynamicTableChange = <T,>(section: keyof Documento, index: number, field: keyof T, value: string) => {
        setFormData(prev => {
            const table = (prev[section] as T[] | undefined) || [];
            const newTable = [...table];
            newTable[index] = { ...newTable[index], [field]: value };
            return { ...prev, [section]: newTable };
        });
    };

    const addRow = <T,>(section: keyof Documento, newRow: T) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...((prev[section] as T[] | undefined) || []), newRow],
        }));
    };
    
    const removeRow = (section: keyof Documento, index: number) => {
        setFormData(prev => ({
            ...prev,
            [section]: ((prev[section] as any[] | undefined) || []).filter((_, i) => i !== index),
        }));
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);

                let autorizacionesData: Autorizacion[] = formData.autorizaciones || [];
                const authTable = data["Autorizaciones"]?.table;
                if (authTable && authTable.length === 2 && authTable[0] && authTable[1]) {
                    const names = authTable[0];
                    const roles = authTable[1];
                    autorizacionesData = [{
                        Elaboro: names['Elaboró'] || '',
                        Reviso: names['Revisó'] || '',
                        Autorizo: names['Autorizó'] || '',
                        CargoElaboro: roles['Cargo Elaboró'] || '',
                        CargoReviso: roles['Cargo Revisó'] || '',
                        CargoAutorizo: roles['Cargo Autorizó'] || '',
                    }];
                } else if (authTable?.length > 0) {
                     autorizacionesData = authTable.map((auth: any) => ({
                         Elaboro: auth.Elaboró || '', Reviso: auth.Revisó || '', Autorizo: auth.Autorizó || '',
                         CargoElaboro: auth['Cargo Elaboró'] || '', CargoReviso: auth['Cargo Revisó'] || '', CargoAutorizo: auth['Cargo Autorizó'] || '',
                    }));
                }

                const controlCambiosData = (data["Control de Cambios"]?.table || []).map((cambio: any) => ({
                    Numero: cambio.Numero || '',
                    Fecha: parseDate(cambio.Fecha) || cambio.Fecha, // Keep original if parse fails
                    'Descripcion del Cambio': cambio['Descripción del Cambio'] || cambio['Descripcion del Cambio'] || '',
                    'Realizado por': cambio['Realizado por'] || '',
                    'Aprobado por': cambio['Aprobado por'] || '',
                }));

                const newDocState: Documento = {
                    ...formData,
                    nombre: data["Nombre del Documento"] || formData.nombre,
                    codigo: data["Código"] || formData.codigo,
                    version: parseInt(data["Versión vigente"], 10) || formData.version,
                    fechaEmision: parseDate(data["Fecha de emisión"]) || formData.fechaEmision,
                    fechaRevision: parseDate(data["Fecha de revisión"]) || formData.fechaRevision,
                    objetivo: data["Objetivo"] || formData.objetivo,
                    alcance: data["Alcance"] || formData.alcance,
                    responsabilidades: data["Responsabilidades"] ? {
                        Actualizacion: data.Responsabilidades['Actualización'] || data.Responsabilidades['Actualizacion'] || '',
                        Ejecucion: data.Responsabilidades['Ejecución'] || data.Responsabilidades['Ejecucion'] || '',
                        Supervision: data.Responsabilidades['Supervisión'] || data.Responsabilidades['Supervision'] || '',
                    } : formData.responsabilidades,
                    desarrolloProceso: data["Desarrollo del Proceso"]?.table || formData.desarrolloProceso,
                    gestionRiesgos: data["Gestión de Riesgos"] ? {
                        ponderacionRiesgos: data["Gestión de Riesgos"]["Ponderación de riesgos"] || [],
                        barrerasSeguridad: data["Gestión de Riesgos"]["Barreras de seguridad"] || [],
                    } : formData.gestionRiesgos,
                    documentosReferencia: data["Documentos de Referencia"]?.table || formData.documentosReferencia,
                    controlCambios: controlCambiosData,
                    autorizaciones: autorizacionesData,
                };
                setFormData(newDocState);
                alert('Datos importados correctamente en el formulario.');

            } catch (error) {
                console.error("Error parsing JSON file:", error);
                alert('Error al importar el archivo. Verifique el formato del JSON.');
            }
        };
        reader.readAsText(file);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {children}
            </div>
        </div>
    );
    
    const FormField: React.FC<{
        name: string;
        label: string;
        value: string;
        onChange: (e: React.ChangeEvent<any>) => void;
        type?: string;
        required?: boolean;
        as?: 'input' | 'textarea' | 'select';
        rows?: number;
        span?: 'full';
        children?: React.ReactNode;
    }> = ({ name, label, as = 'input', span, children, ...props }) => (
        <div className={span === 'full' ? "md:col-span-2" : ""}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            {as === 'textarea' ? (
                <textarea id={name} name={name} {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            ) : as === 'select' ? (
                 <select id={name} name={name} {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    {children}
                </select>
            ) : (
                <input id={name} name={name} {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Documento</h2>
                    <div className='flex items-center gap-4'>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
                        <button type='button' onClick={handleImportClick} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                           Importar desde JSON
                        </button>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                             <FormField name="nombre" label="Nombre del Documento" value={formData.nombre} onChange={handleChange} required />
                             <FormField name="codigo" label="Código" value={formData.codigo} onChange={handleChange} required />
                             <FormField name="version" label="Versión" type="number" value={String(formData.version)} onChange={e => setFormData(p => ({...p, version: parseInt(e.target.value, 10) || 1}))} />
                             <FormField name="estado" label="Estado" value={formData.estado} onChange={handleChange} as="select">
                                <option value="Vigente">Vigente</option>
                                <option value="Obsoleto">Obsoleto</option>
                             </FormField>
                             <FormField name="fechaEmision" label="Fecha Emisión" type="date" value={formData.fechaEmision || ''} onChange={handleChange} />
                             <FormField name="fechaRevision" label="Fecha Revisión" type="date" value={formData.fechaRevision || ''} onChange={handleChange} />
                             <FormField name="area" label="Área" value={formData.area} onChange={handleChange} as="select">
                                <option value="">Seleccionar área</option>
                                {areas.map(a => <option key={a} value={a}>{a}</option>)}
                            </FormField>
                             <FormField name="tipoDocumento" label="Tipo Documento" value={formData.tipoDocumento} onChange={handleChange} as="select">
                                <option value="">Seleccionar tipo</option>
                                {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </FormField>
                        </div>

                        <Section title="Objetivo y Alcance">
                            <FormField name="objetivo" label="Objetivo" value={formData.objetivo || ''} onChange={handleChange} as="textarea" rows={3} span="full" />
                            <FormField name="alcance" label="Alcance" value={formData.alcance || ''} onChange={handleChange} as="textarea" rows={3} span="full" />
                        </Section>

                        <Section title="Responsabilidades">
                            <FormField name="Actualizacion" label="Actualización" value={formData.responsabilidades?.Actualizacion || ''} onChange={e => handleNestedChange('responsabilidades', 'Actualizacion', e.target.value)} />
                            <FormField name="Ejecucion" label="Ejecución" value={formData.responsabilidades?.Ejecucion || ''} onChange={e => handleNestedChange('responsabilidades', 'Ejecucion', e.target.value)} />
                            <FormField name="Supervision" label="Supervisión" value={formData.responsabilidades?.Supervision || ''} onChange={e => handleNestedChange('responsabilidades', 'Supervision', e.target.value)} />
                        </Section>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Desarrollo del Proceso</h3>
                             <div className="mt-4 space-y-2">
                                {formData.desarrolloProceso?.map((paso, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-x-4 items-start p-2 border border-gray-200 dark:border-gray-600 rounded-md">
                                        <div className="col-span-1"><input type="text" placeholder="No." value={paso.No} onChange={e => handleDynamicTableChange<ProcesoPaso>('desarrolloProceso', index, 'No', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-3"><input type="text" placeholder="Responsable" value={paso.Responsable} onChange={e => handleDynamicTableChange<ProcesoPaso>('desarrolloProceso', index, 'Responsable', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-7"><input type="text" placeholder="Actividad" value={paso.Actividad} onChange={e => handleDynamicTableChange<ProcesoPaso>('desarrolloProceso', index, 'Actividad', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-1 flex items-center h-full"><button type="button" onClick={() => removeRow('desarrolloProceso', index)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5" /></button></div>
                                    </div>
                                ))}
                             </div>
                             <button type="button" onClick={() => addRow<ProcesoPaso>('desarrolloProceso', {No: String((formData.desarrolloProceso?.length || 0) + 1), Responsable: '', Actividad: ''})} className="mt-2 flex items-center gap-2 px-3 py-2 border border-dashed border-gray-400 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                                <PlusIcon className="w-4 h-4" /> Añadir Paso
                            </button>
                        </div>
                        
                        <Section title="Control de Cambios">
                             <div className="md:col-span-2 mt-4 space-y-2">
                                {formData.controlCambios?.map((cambio, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-x-4 items-start p-2 border border-gray-200 dark:border-gray-600 rounded-md">
                                        <div className="col-span-1"><input type="text" placeholder="No." value={cambio.Numero} onChange={e => handleDynamicTableChange<ControlCambio>('controlCambios', index, 'Numero', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-2"><input type="date" value={cambio.Fecha || ''} onChange={e => handleDynamicTableChange<ControlCambio>('controlCambios', index, 'Fecha', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-4"><input type="text" placeholder="Descripción" value={cambio['Descripcion del Cambio']} onChange={e => handleDynamicTableChange<ControlCambio>('controlCambios', index, 'Descripcion del Cambio', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-2"><input type="text" placeholder="Realizado por" value={cambio['Realizado por']} onChange={e => handleDynamicTableChange<ControlCambio>('controlCambios', index, 'Realizado por', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-2"><input type="text" placeholder="Aprobado por" value={cambio['Aprobado por']} onChange={e => handleDynamicTableChange<ControlCambio>('controlCambios', index, 'Aprobado por', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-500 shadow-sm bg-white dark:bg-gray-700" /></div>
                                        <div className="col-span-1 flex items-center h-full"><button type="button" onClick={() => removeRow('controlCambios', index)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5" /></button></div>
                                    </div>
                                ))}
                             </div>
                             <button type="button" onClick={() => addRow<ControlCambio>('controlCambios', {Numero: String((formData.controlCambios?.length || 0) + 1).padStart(2, '0'), Fecha: new Date().toISOString().split('T')[0], 'Descripcion del Cambio': '', 'Realizado por': '', 'Aprobado por': ''})} className="mt-2 flex items-center gap-2 px-3 py-2 border border-dashed border-gray-400 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                                <PlusIcon className="w-4 h-4" /> Añadir Cambio
                            </button>
                        </Section>

                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3 -mx-6 -mb-6 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">Guardar Documento</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
