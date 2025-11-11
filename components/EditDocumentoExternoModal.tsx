
import React, { useState, useEffect } from 'react';
import { DocumentoExterno } from '../types';
import { XIcon } from './icons/XIcon';

interface EditDocumentoExternoModalProps {
    documento: DocumentoExterno | null;
    onClose: () => void;
    onSave: (documento: DocumentoExterno) => void;
    areas: string[];
    docTypes: string[];
}

const emptyDocumentoExterno: Omit<DocumentoExterno, 'id'> = {
    codigo: '',
    nombre: '',
    tipoDocumento: '',
    areaResponsable: '',
    fuenteEmisor: '',
    codigoEmisor: '',
    fechaEmisionOriginal: new Date().toISOString().split('T')[0],
    fechaRecepcionRegistro: new Date().toISOString().split('T')[0],
    version: '',
    estado: 'Vigente',
    periodicidadRevision: 'Anual',
    ubicacion: '',
    responsableCustodia: '',
};

const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children}
        </div>
    </div>
);

const FormField: React.FC<{
    name: keyof DocumentoExterno;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    type?: string;
    as?: 'input' | 'textarea' | 'select';
    children?: React.ReactNode;
    className?: string;
}> = ({ name, label, as = 'input', className, children, ...props }) => (
    <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {as === 'select' ? (
             <select id={name} name={name} {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {children}
            </select>
        ) : (
            <input id={name} name={name} {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        )}
    </div>
);


export const EditDocumentoExternoModal: React.FC<EditDocumentoExternoModalProps> = ({ documento, onClose, onSave, areas, docTypes }) => {
    const [formData, setFormData] = useState<DocumentoExterno>(
        documento || { ...emptyDocumentoExterno, id: `de-${Date.now()}` }
    );
    const isEditing = !!documento;

    useEffect(() => {
        if (documento) {
            setFormData(documento);
        } else {
            setFormData({ ...emptyDocumentoExterno, id: `de-${Date.now()}` });
        }
    }, [documento]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    const tipoDocumentoOptions = [
        "Manual", "Guía", "Norma", "Especificación técnica", "Contrato", "Licencia", "Instructivo de fabricante", 
        "Plano", "Ficha técnica", "Protocolo externo", "Referencia científica", "Hoja MSDS"
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{isEditing ? `Editar: ${documento?.nombre}` : 'Nuevo Documento Externo'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
                    <Section title="Identificación">
                        <FormField name="codigo" label="Código / Clave" value={formData.codigo} onChange={handleChange} />
                        <FormField name="nombre" label="Nombre del Documento" value={formData.nombre} onChange={handleChange} className="lg:col-span-2" />
                        <FormField name="tipoDocumento" label="Tipo de Documento" value={formData.tipoDocumento} onChange={handleChange} as="select">
                             <option value="">Seleccionar tipo</option>
                             {tipoDocumentoOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </FormField>
                        <FormField name="areaResponsable" label="Área Responsable" value={formData.areaResponsable} onChange={handleChange} as="select">
                             <option value="">Seleccionar área</option>
                             {areas.map(a => <option key={a} value={a}>{a}</option>)}
                        </FormField>
                    </Section>

                    <Section title="Origen y Emisor">
                        <FormField name="fuenteEmisor" label="Fuente / Emisor" value={formData.fuenteEmisor} onChange={handleChange} />
                        <FormField name="codigoEmisor" label="Referencia o Código del Emisor" value={formData.codigoEmisor} onChange={handleChange} />
                    </Section>

                     <Section title="Vigencia y Control">
                        <FormField name="version" label="Versión / Revisión" value={formData.version} onChange={handleChange} />
                        <FormField name="estado" label="Estado de Vigencia" value={formData.estado} onChange={handleChange} as="select">
                            <option value="Vigente">Vigente</option>
                            <option value="Obsoleto">Obsoleto</option>
                            <option value="En revisión">En revisión</option>
                        </FormField>
                        <FormField name="periodicidadRevision" label="Periodicidad de Revisión" value={formData.periodicidadRevision} onChange={handleChange} />
                        <FormField name="fechaEmisionOriginal" label="Fecha de Emisión Original" value={formData.fechaEmisionOriginal} onChange={handleChange} type="date" />
                        <FormField name="fechaRecepcionRegistro" label="Fecha de Recepción / Registro" value={formData.fechaRecepcionRegistro} onChange={handleChange} type="date" />
                        <FormField name="fechaUltimaRevisionInterna" label="Fecha de Última Revisión Interna" value={formData.fechaUltimaRevisionInterna || ''} onChange={handleChange} type="date" />
                        <FormField name="proximaRevisionProgramada" label="Próxima Revisión Programada" value={formData.proximaRevisionProgramada || ''} onChange={handleChange} type="date" />
                    </Section>

                    <Section title="Ubicación y Acceso">
                        <FormField name="ubicacion" label="Ubicación Física / Digital" value={formData.ubicacion} onChange={handleChange} />
                        <FormField name="responsableCustodia" label="Responsable de Custodia" value={formData.responsableCustodia} onChange={handleChange} />
                    </Section>
                    
                    <Section title="Trazabilidad y Control">
                        <FormField name="validadoPor" label="Validado por" value={formData.validadoPor || ''} onChange={handleChange} />
                        <FormField name="fechaVerificacionVigencia" label="Fecha de Verificación de Vigencia" value={formData.fechaVerificacionVigencia || ''} onChange={handleChange} type="date" />
                        <FormField name="evidenciaVerificacion" label="Evidencia de Verificación" value={formData.evidenciaVerificacion || ''} onChange={handleChange} />
                         <FormField name="observaciones" label="Observaciones / Cambios Relevantes" value={formData.observaciones || ''} onChange={handleChange} className="lg:col-span-3"/>
                    </Section>

                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3 -mx-6 -mb-6 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
