

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
    Nombre: string;
    Codigo: string;
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
  materialEquipo?: string[];
}

export interface DocumentoExterno {
  id: string;
  // Identificación
  codigo: string;
  nombre: string;
  tipoDocumento: string;
  areaResponsable: string;
  // Origen y Emisor
  fuenteEmisor: string;
  codigoEmisor: string;
  // Vigencia y Control
  fechaEmisionOriginal: string;
  fechaRecepcionRegistro: string;
  version: string;
  estado: 'Vigente' | 'Obsoleto' | 'En revisión';
  periodicidadRevision: string;
  fechaUltimaRevisionInterna?: string;
  proximaRevisionProgramada?: string;
  // Ubicación y Acceso
  ubicacion: string;
  responsableCustodia: string;
  // Trazabilidad
  documentosRelacionados?: string[];
  observaciones?: string;
  // Control y Evidencia
  fechaVerificacionVigencia?: string;
  evidenciaVerificacion?: string;
  validadoPor?: string;
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

export type CalificacionSatisfaccion = 'Excelente' | 'Bueno' | 'Regular' | 'Malo' | 'Pésimo';

export interface RegistroEncuestaSatisfaccion {
    id: string;
    fecha: string;
    paciente: string;
    habitacion?: string;
    medico?: string;
    
    tramitesIngreso: CalificacionSatisfaccion;
    informacionNormas: CalificacionSatisfaccion;
    tiempoEsperaAtencion: CalificacionSatisfaccion;
    atencionEnfermeria: CalificacionSatisfaccion;
    atencionPersonalMedico: CalificacionSatisfaccion;
    confidencialidadPrivacidad: CalificacionSatisfaccion;
    higieneLimpieza: CalificacionSatisfaccion;
    vigilanciaInterna: CalificacionSatisfaccion;
    calidadAlimentos: CalificacionSatisfaccion;
    servicioGeneral: CalificacionSatisfaccion;
    tramitesEgreso: CalificacionSatisfaccion;

    recomendaria: 'SI' | 'NO';
    comentarios?: string;
}

export interface HallazgoAuditoria {
  id: string;
  tipo: 'No Conformidad Mayor' | 'No Conformidad Menor' | 'Observación' | 'Oportunidad de Mejora';
  descripcion: string;
  evidencia: string;
  requisitoIncumplido: string;
  areaAuditada: string;
  auditorResponsable: string;
  fechaDeteccion: string;
  accionCorrectivaId?: string; // Link to AccionCorrectiva
}

export interface Auditoria {
  id: string;
  codigo: string;
  fechaInicio: string;
  fechaFin: string;
  objetivo: string;
  alcance: string;
  criterios: string;
  auditorLider: string;
  equipoAuditor: string[];
  estado: 'Planificada' | 'En Progreso' | 'Completada' | 'Cancelada';
  hallazgos: HallazgoAuditoria[];
}

export interface Oficio {
  id: string;
  oficioNo: string; // e.g., OF-2024-001
  fechaEmision: string; // YYYY-MM-DD
  destinatarioNombre: string;
  destinatarioCargo: string;
  destinatarioOrganizacion: string;
  asunto: string;
  cuerpo: string;
  firmante: string; // Person who signs the oficio
  estado: 'Borrador' | 'Emitido' | 'Anulado';
}

export interface JsonImportData {
    documentos?: Documento[];
    formatos?: Formato[];
    accionesCorrectivas?: AccionCorrectiva[];
    revisiones?: Revision[];
    documentosExternos?: DocumentoExterno[];
    auditorias?: Auditoria[];
    indicadores?: IndicadorCategoria[];
    oficios?: Oficio[]; // Added new type
}

export interface RegistroTiempoEspera {
    id: string;
    fecha: string; // YYYY-MM-DD
    turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Jornada Especial';
    genero: 'Hombre' | 'Mujer';
    solicitudHora: string; // HH:mm
    entradaHora: string; // HH:mm
    minutosEspera: number;
}

export interface RegistroInfeccionesNosocomiales {
    id: string;
    mes: string; // e.g., "Enero 2024"
    area: 'Cirugía General' | 'Pediatría' | 'Medicina Interna' | 'Ginecología Obstétrica' | 'UCIN' | 'UCIA';
    bacteriemias: { casos: number; diasExposicion: number; };
    neumonias: { casos: number; diasExposicion: number; };
    sitioQuirurgico: { casos: number; procedimientos: number; };
    viasUrinarias: { casos: number; diasExposicion: number; };
}

export interface RegistroNacimientosCesareas {
    id: string;
    mes: string; // e.g., "Enero 2024"
    turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Jornada Especial';
    totalNacimientos: number;
    vaginales: number;
    cesareas: number;
    porcentajeCesareas: number;
}

export interface RegistroTratoDignoEnfermeria {
    id: string;
    fecha: string; // YYYY-MM-DD
    turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Jornada Especial';
    genero: 'Hombre' | 'Mujer';
    numeroExpediente: string;
    saludoAmable: boolean;
    sePresenta: boolean;
    usaNombre: boolean;
    explicaCuidados: boolean;
    estanciaAgradable: boolean;
    cuidaIntimidad: boolean;
    daSeguridad: boolean;
    tratoRespetuoso: boolean;
    ensenanzaCuidados: boolean;
    continuidadCuidados: boolean;
    satisfechoTrato: boolean;
}

export interface RegistroPrevencionCaidas {
    id: string;
    fecha: string; // YYYY-MM-DD
    turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Jornada Especial';
    genero: 'Hombre' | 'Mujer';
    numeroExpediente: string;
    valoraRiesgo: boolean;
    establecePlan: boolean;
    utilizaRecursos: boolean;
    informaPaciente: boolean;
    orientaEquipo: boolean;
    revaloraAjusta: boolean;
    registraIncidente: boolean;
}

export interface RegistroMinistracionMedicamentos {
    id: string;
    fecha: string; // YYYY-MM-DD
    turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Jornada Especial';
    genero: 'Hombre' | 'Mujer';
    claveEnfermeria: string;
    numeroExpediente: string;
    verificaDatosOrden: boolean;
    verificaNombrePresentacion: boolean;
    verificaCaducidad: boolean;
    verificaDosisHora: boolean;
    hablaYExplica: boolean;
    cercioraIngestion: boolean;
    registraTermino: boolean;
}

export interface RegistroClinicoNotasEnfermeria {
    id: string;
    fecha: string; // YYYY-MM-DD
    turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Jornada Especial';
    genero: 'Hombre' | 'Mujer';
    numeroExpediente: string;
    identificacionCorrecta: boolean;
    datosObjetivos: boolean;
    describeEstadoIngreso: boolean;
    registraPlan: boolean;
    describeEvolucion: boolean;
    continuidadTurno: boolean;
    detectaFactoresRiesgo: boolean;
    documentaPlanAlta: boolean;
}

export interface RegistroVenoclisisInstalada {
    id: string;
    fecha: string; // YYYY-MM-DD
    turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Jornada Especial';
    genero: 'Hombre' | 'Mujer';
    claveEnfermeria: string;
    numeroExpediente: string;
    solucionMenos24h: boolean;
    membreteNormativo: boolean;
    equipoMenos72h: boolean;
    equipoLibreResiduos: boolean;
    sitioPuncionLimpio: boolean;
    cateterFijoLimpio: boolean;
    circuitoCerrado: boolean;
}


export type RegistroEnfermeria = RegistroTratoDignoEnfermeria | RegistroPrevencionCaidas | RegistroMinistracionMedicamentos | RegistroClinicoNotasEnfermeria | RegistroVenoclisisInstalada;

// NEW: Interfaces for RegistroEventoAdverso
export type SexoPaciente = '1' | '2'; // MASCULINO | FEMENINO
export type LugarEventoAdverso = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '20' | '18' | '19' | '21' | '22' | '23';
export type TurnoEventoAdverso = '0' | '1' | '2' | '3' | '4';
export type PersonalInvolucradoOptions = 'medicoea' | 'enfermeraea' | 'camilleroea' | 'tecnicoea' | 'otroea' | 'formacionea';
export type PresenciaEventoAdverso = '0' | '1' | '2' | '3' | '4' | '5' | '6';
export type TipoIncidente = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type TipoGravedad = 'A' | 'B' | 'C' | 'D' | 'E';
export type SiNo = 'SI' | 'NO';
export type FactoresIncidenteOptions = 'facinc1' | 'facinc2' | 'facinc3' | 'facinc4' | 'facinc5' | 'facinc6' | 'facinc7' | 'facinc8';
export type AccionesMejoraOptions = 'accion1' | 'accion2' | 'accion3' | 'accion4' | 'accion5' | 'accion6' | 'accion7' | 'accion8' | 'accion9';

export interface RegistroEventoAdverso {
  id: string;
  // DATOS DEL PACIENTE
  sexo: SexoPaciente;
  edad: number;
  // DESCRIPCIÓN DEL EVENTO ADVERSO
  lugarea: LugarEventoAdverso;
  lugareaotro?: string;
  areaHospitalizacion?: string;
  habitacion?: string;
  turnoea: TurnoEventoAdverso;
  personal_involucrado: Partial<Record<PersonalInvolucradoOptions, boolean>>;
  personaleaotro?: string;
  fechaea: string; // YYYY-MM-DD
  horades: boolean;
  horaea?: string; // HH format '00' to '24'
  minutoea?: string; // MM format '00' to '59'
  presenciaronea: PresenciaEventoAdverso;
  otropres?: string;
  descripcionea: string;

  // TIPO DE INCIDENTE
  tipoincidente: TipoIncidente;
  medicacion?: string; // Specific for A, values are '0' | '1' | ...
  doctos?: string; // Specific for B
  infeccasoc?: string; // Specific for C
  stoea?: string; // Specific for C
  hemoderivados?: string; // Specific for D
  nutricion?: string; // Specific for E
  dispositivosyem?: string; // Specific for F
  procquirur?: string; // Specific for G
  caidas?: string; // Specific for H
  tipocaida?: string; // Specific for H
  caidasotro?: string; // Required if tipocaida is '5'
  patologia?: string; // Specific for I
  otroincidente?: string; // Required if tipoincidente is 'J'

  // GRAVEDAD, FACTORES DEL INCIDENTE Y ACCIONES
  gravedad: TipoGravedad;
  analisis_causa_raiz?: SiNo;
  factores_incidente: Partial<Record<FactoresIncidenteOptions, boolean>>;
  facincotro?: string;
  evitado: SiNo;
  evitadootro?: string;
  informacion_paciente: SiNo;
  proporciono?: string; // '0' | '1' | ...
  proporcionootro?: string;
  accion_correctiva: SiNo;
  acciones_mejora?: Partial<Record<AccionesMejoraOptions, boolean>>;
  accionotro?: string;
}

// FIX: Made the Indicador interface generic to correctly type its 'registros' array.
export interface Indicador<T> {
    id: string;
    nombre: string;
    descripcion: string;
    registros: T[]; // Now uses the generic type T
}

export interface IndicadorCategoria {
    id: string;
    nombre: string;
    indicadores: Indicador<any>[]; // Still any here, as categories can hold different types of indicators
}

export interface IndicadorTiempoEspera extends Indicador<RegistroTiempoEspera> {}

export interface IndicadorInfeccionesNosocomiales extends Indicador<RegistroInfeccionesNosocomiales> {}

export interface IndicadorNacimientosCesareas extends Indicador<RegistroNacimientosCesareas> {}

export interface IndicadorTratoDignoEnfermeria extends Indicador<RegistroTratoDignoEnfermeria> {}

export interface IndicadorPrevencionCaidas extends Indicador<RegistroPrevencionCaidas> {}

export interface IndicadorMinistracionMedicamentos extends Indicador<RegistroMinistracionMedicamentos> {}

export interface IndicadorRegistroClinicoNotasEnfermeria extends Indicador<RegistroClinicoNotasEnfermeria> {}

export interface IndicadorVenoclisisInstalada extends Indicador<RegistroVenoclisisInstalada> {}

export interface IndicadorEncuestaSatisfaccion extends Indicador<RegistroEncuestaSatisfaccion> {}

export interface IndicadorEventosAdversos extends Indicador<RegistroEventoAdverso> {}

// FIX: Added specific types for the form schema to improve type inference
export interface FormFieldBase {
    name: string;
    type: string;
    label: string;
    required?: boolean;
    requiredIf?: { field: string; equals: string | boolean; };
    requiredIfAny?: { fields: string[]; in: (string | boolean | undefined)[]; }; // 'in' can contain undefined for optional fields
    options?: { value: string; label: string; }[];
    min?: number;
    max?: number;
    maxLength?: number;
    format?: string;
    validationRule?: string;
    transform?: 'uppercase';
    rows?: number; // For textarea
}

export interface FormSectionSchema {
    id: string;
    label: string;
    fields: FormFieldBase[];
}

export interface FormSchema {
    formId: string;
    title: string;
    description: string;
    sections: FormSectionSchema[];
}