import { Documento, Formato, AccionCorrectiva } from '../types';

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
    'Logística': 'LO', // Added Logística
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

// New codes for action types (used for AccionCorrectiva)
export const accionPrefixCodes: Record<string, string> = {
    'Acción Correctiva': 'AC',
    'Acción Preventiva': 'AP', // For future use if preventive actions are added
};

export const getNextSequentialNumber = <T extends { codigo: string }>(
    prefix: string, 
    items: T[]
): string => {
    const relevantItems = items.filter(item => item.codigo.startsWith(prefix));
    if (relevantItems.length === 0) {
        return '001';
    }
    const maxNum = relevantItems.reduce((max, item) => {
        const parts = item.codigo.split('-');
        // Ensure the third part exists and is a number (e.g., AC-AREA-NNN)
        if (parts.length > 2) {
            const numPart = parseInt(parts[2], 10);
            return !isNaN(numPart) && numPart > max ? numPart : max;
        }
        return max;
    }, 0);
    return String(maxNum + 1).padStart(3, '0');
};

export const getNextAccionCorrectivaCode = (
    area: string,
    allAcciones: AccionCorrectiva[]
): string => {
    const accionTypeCode = accionPrefixCodes['Acción Correctiva']; // Always 'AC' for now
    const areaCode = areaCodes[area];

    if (!accionTypeCode || !areaCode) {
        console.warn(`Could not generate action code: Missing type code for 'Acción Correctiva' or area code for '${area}'`);
        return `AC-${areaCode || 'XX'}-XXX`; // Fallback code
    }

    const prefix = `${accionTypeCode}-${areaCode}-`;
    const nextNum = getNextSequentialNumber(prefix, allAcciones); // Use generic helper
    return `${prefix}${nextNum}`;
};
