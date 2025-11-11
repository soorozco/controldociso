import { Documento, Formato } from '../types';

export const areaCodes: Record<string, string> = {
    'Dirección General': 'DG',
    'Calidad y Seguridad del Paciente': 'CA',
    'Capital Humano': 'CH',
    'Archivo Clínico': 'AR',
    'Admisión Hospitalaria': 'AH',
    'Enfermería': 'EN',
    'Laboratorio Clínico': 'LB',
    'Imagenología / Rayos X': 'RX',
    'Banco de Sangre': 'BS',
    'Mantenimiento': 'MT',
    'Ingeniería Biomédica': 'BM',
    'Farmacia': 'FA',
    'Cocina / Nutrición': 'NU',
    'Ropería y Lavandería': 'RO',
    'Servicios Generales / Limpieza': 'SG',
    'Seguridad y Protección Civil': 'PC',
    'Trabajo Social': 'TS',
    'Administración / Compras': 'AD',
    'Contabilidad y Finanzas': 'CF',
    'Sistemas / Informática': 'SI',
    'Epidemiología / CODECIN': 'EP',
    'Comité de Calidad y Seguridad del Paciente (COCASEP)': 'CO',
    // From initial data
    'Calidad': 'CA',
    'Dirección': 'DG',
    'Producción': 'PD', // Using PD for producción
};

export const docTypeCodes: Record<string, string> = {
    'Procedimiento': 'PR',
    'Instrucción de trabajo': 'IT',
    'Formato / Registro': 'FT',
    'Manual': 'MA',
    'Plan o Programa': 'PL',
    'Política': 'PO',
    'Guía o Lineamiento': 'GL',
    // From initial data
    'Instrucción': 'IT', 
    'Formato': 'FT'
};

export const getNextSequentialNumber = (
    prefix: string, 
    allDocs: (Documento | Formato)[]
): string => {
    const relevantDocs = allDocs.filter(d => d.codigo.startsWith(prefix));
    if (relevantDocs.length === 0) {
        return '01';
    }
    const maxNum = relevantDocs.reduce((max, doc) => {
        const numPart = parseInt(doc.codigo.split('-')[2], 10);
        return !isNaN(numPart) && numPart > max ? numPart : max;
    }, 0);
    return String(maxNum + 1).padStart(2, '0');
};