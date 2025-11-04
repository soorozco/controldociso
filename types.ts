

export interface SimpleCambio {
  version: number;
  fecha: string;
  descripcion: string;
}

export interface Responsabilidades {
  Actualizacion: string;
  Ejecucion: string;
  Supervision: string;
}

export interface ProcesoPaso {
  No: string;
  Responsable: string;
  Actividad: string;
}

export interface GestionRiesgos {
  ponderacionRiesgos: string[];
  barrerasSeguridad: string[];
}

export interface DocumentoReferencia {
    // Define properties if any, otherwise it's an empty object for now
}

export interface ControlCambio {
  Numero: string;
  Fecha: string;
  'Descripcion del Cambio': string;
  'Realizado por': string;
  'Aprobado por': string;
}

export interface Autorizacion {
    Elaboro: string;
    Reviso: string;
    Autorizo: string;
    CargoElaboro: string;
    CargoReviso: string;
    CargoAutorizo: string;
}


export interface Documento {
  id: string;
  codigo: string;
  nombre: string;
  version: number;
  fechaAprobacion: string; // YYYY-MM-DD
  area: string;
  tipoDocumento: string;
  estado: 'Vigente' | 'Obsoleto';
  archivo: string;
  relaciones?: string[];
  cambios?: SimpleCambio[];

  // Detailed fields from JSON schema
  fechaEmision?: string;
  fechaRevision?: string;
  objetivo?: string;
  alcance?: string;
  responsabilidades?: Responsabilidades;
  desarrolloProceso?: ProcesoPaso[];
  gestionRiesgos?: GestionRiesgos;
  documentosReferencia?: DocumentoReferencia[];
  controlCambios?: ControlCambio[];
  autorizaciones?: Autorizacion[];
}

export interface Formato extends Documento {
  documentoPadreCodigo: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface Accion {
  descripcion: string;
  responsable: string;
  fechaPrevista: string;
  completada: boolean;
}

export interface AccionCorrectiva {
  id: string;
  codigo: string;
  descripcion: string;
  causaRaiz: string;
  acciones: Accion[];
  responsableApertura: string;
  fechaApertura: string; // YYYY-MM-DD
  estado: 'Abierta' | 'En Proceso' | 'Cerrada' | 'Verificada';
  fechaCierre?: string; // YYYY-MM-DD
}

export interface Revision {
    id: string;
    fecha: string; // YYYY-MM-DD
    tipo: 'Interna' | 'Externa' | 'Dirección';
    responsable: string;
    objetivos: string;
    conclusiones: string;
    estado: 'Planificada' | 'Completada' | 'Cancelada';

    // NEW fields based on document structure
    estadoAccionesAnteriores?: string;
    resumenCambios?: string;
    desempenoEficaciaSGC?: string;
    cumplimientoObjetivosPrevios?: string;
    seguimientoAuditorias?: string;
    adecuacionRecursos?: string;
    eficaciaRiesgos?: string;
    oportunidadesMejoraAcciones?: string;
}

export interface JsonImportData {
    documentos?: Documento[];
    formatos?: Formato[];
    accionesCorrectivas?: AccionCorrectiva[];
    revisiones?: Revision[];
}